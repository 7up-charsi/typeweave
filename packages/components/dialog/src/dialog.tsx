'use client';

import { useControllableState } from '@webbo-ui/use-controllable-state';
import { Slot } from '@webbo-ui/slot';
import { useClickOutside } from '@webbo-ui/use-click-outside';
import { usePress } from '@react-aria/interactions';
import { useScrollLock } from '@webbo-ui/use-scroll-lock';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import { createPortal } from 'react-dom';
import { FocusTrap, FocusScope } from '@webbo-ui/focus-trap';
import { createContextScope } from '@webbo-ui/context';
import { useIsDisabled } from '@webbo-ui/use-is-disabled';
import { useEffect, useId, useMemo, useRef } from 'react';
import { VisuallyHidden } from '@webbo-ui/visually-hidden';
import { DialogVariantProps, dialog } from '@webbo-ui/theme';

type Reason = 'pointer' | 'escape' | 'outside' | 'virtual';

type CloseEvent = { preventDefault(): void };

interface RootContext {
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
  isOpen: boolean;
  scope: FocusScope;
  keepMounted: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const Root_Name = 'Dialog.Root';

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(Root_Name);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof dialog>>(Root_Name);

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  /**
   * reason param could be "pointer" | "escape" | "outside" | "virtual"
   * 1. when dialog closed on interaction with `Close` component then reason is "pointer"
   * 2. when dialog closed on interaction outside `Content` component then reason is "outside"
   * 2. when dialog closed on Escape keypress then reason is "escape"
   * 2. when dialog closed on interaction with visually hidden close button then reason is "virtual" and this will only happen when screen reader read dialog content and close press close button
   *
   * This callback can be used to prevent close conditionally
   * if you want to prevent close when Escape is pressed then do this
   * ```
   *  onClose={(e, reason) => {
   *   if (reason === 'escape') e.preventDefault();
   *  }}
   * ```
   *
   * @default undefined
   */
  onClose?: (event: CloseEvent, reason: Reason) => void;
  /**
   * When this prop is true, all content stays in the DOM and only css visiblity changes on open/close
   *
   * @default false
   */
  keepMounted?: boolean;
}

export const Root = (props: RootProps) => {
  const {
    children,
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange,
    onClose,
    keepMounted = false,
  } = props;

  const contentId = useId();
  const titleId = useId();
  const descriptionId = useId();

  const scope = useRef<FocusScope>({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
  }).current;

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: isOpenProp,
    onChange: onOpenChange,
    resetStateValue: false,
  });

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
  });

  const handleClose = useCallbackRef((reason: Reason) => {
    if (scope.paused) return;

    const eventObj = { defaultPrevented: false };

    const preventDefault = () => {
      eventObj.defaultPrevented = true;
    };

    onClose?.({ preventDefault }, reason);

    if (!eventObj.defaultPrevented) setOpen(false);
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose('escape');
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleClose, isOpen]);

  return (
    <RootProvider
      handleClose={handleClose}
      handleOpen={handleOpen}
      isOpen={isOpen}
      scope={scope}
      keepMounted={keepMounted}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      {children}
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + Root_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'Dialog.Trigger';

export interface TriggerProps {
  children: React.ReactNode;
  a11yLabel?: string;
  a11yDescription?: string;
}

export const Trigger = (props: TriggerProps) => {
  const { children, a11yLabel, a11yDescription } = props;

  const rootContext = useRootContext(Trigger_Name);

  const { setElement, isDisabled } = useIsDisabled();

  const { pressProps } = usePress({
    isDisabled,
    onPress: rootContext.handleOpen,
  });

  return (
    <Slot
      ref={setElement}
      aria-expanded={rootContext.isOpen}
      aria-controls={rootContext.isOpen ? rootContext.contentId : undefined}
      aria-label={a11yLabel}
      aria-describedby={a11yDescription}
      {...pressProps}
    >
      {children}
    </Slot>
  );
};

Trigger.displayName = 'webbo-ui.' + Trigger_Name;

// *-*-*-*-* Close *-*-*-*-*

const Close_Name = 'Dialog.Close';

export interface CloseProps {
  children: React.ReactNode;
}

export const Close = (props: CloseProps) => {
  const { children } = props;

  const { handleClose } = useRootContext(Close_Name);

  const { setElement, isDisabled } = useIsDisabled();

  const { pressProps } = usePress({
    isDisabled,
    onPress: () => {
      handleClose('pointer');
    },
  });

  return (
    <Slot ref={setElement} {...pressProps}>
      {children}
    </Slot>
  );
};

Close.displayName = 'webbo-ui.' + Close_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'Dialog.Portal';

export interface PortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const rootContext = useRootContext(Portal_Name);

  if (rootContext.keepMounted) {
    return createPortal(
      <div style={{ visibility: rootContext.isOpen ? 'visible' : 'hidden' }}>
        {children}
      </div>,
      container,
    );
  }

  return rootContext.isOpen ? createPortal(children, container) : null;
};

Portal.displayName = 'webbo-ui.' + Portal_Name;

// *-*-*-*-* Title *-*-*-*-*

const Title_Name = 'Dialog.Title';

export interface TitleProps {
  children?: React.ReactNode;
  className?: string;
}

export const Title = (props: TitleProps) => {
  const { children, className } = props;

  const rootContext = useRootContext(Title_Name);
  const styles = useStylesContext(Description_Name);

  return (
    <div id={rootContext.titleId} className={styles.title({ className })}>
      {children}
    </div>
  );
};

Title.displayName = 'webbo-ui.' + Title_Name;

// *-*-*-*-* Description *-*-*-*-*

const Description_Name = 'Dialog.Description';

export interface DescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export const Description = (props: DescriptionProps) => {
  const { children, className } = props;

  const rootContext = useRootContext(Description_Name);
  const styles = useStylesContext(Description_Name);

  return (
    <div
      id={rootContext.descriptionId}
      className={styles.description({ className })}
    >
      {children}
    </div>
  );
};

Description.displayName = 'webbo-ui.' + Description_Name;

// *-*-*-*-* Content *-*-*-*-*

const Content_Name = 'Dialog.Content';

export interface ContentProps extends DialogVariantProps {
  children?: React.ReactNode;
  className?: string;
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

export const Content = (props: ContentProps) => {
  const { children, className, noA11yDescription, noA11yTitle, shadow } = props;

  const rootContext = useRootContext(Content_Name);

  useScrollLock({ enabled: rootContext.isOpen });

  const setOutsideEle = useClickOutside<HTMLDivElement>({
    isDisabled: !rootContext.isOpen,
    callback: () => {
      rootContext.handleClose('outside');
    },
  });

  const styles = useMemo(() => dialog({ shadow }), [shadow]);

  return (
    <StylesProvider {...styles}>
      <FocusTrap
        loop
        trapped
        scope={rootContext.scope}
        isDisabled={!rootContext.isOpen}
      >
        <div
          ref={setOutsideEle}
          role="dialog"
          aria-labelledby={noA11yTitle ? undefined : rootContext.titleId}
          aria-describedby={
            noA11yDescription ? undefined : rootContext.descriptionId
          }
          aria-modal={true}
          id={rootContext.contentId}
          className={styles.content({ className })}
        >
          <VisuallyHidden>
            <button onPointerUp={() => rootContext.handleClose('virtual')}>
              close
            </button>
          </VisuallyHidden>

          {children}

          <VisuallyHidden>
            <button onPointerUp={() => rootContext.handleClose('virtual')}>
              close
            </button>
          </VisuallyHidden>
        </div>
      </FocusTrap>
    </StylesProvider>
  );
};

Content.displayName = 'webbo-ui.' + Content_Name;
