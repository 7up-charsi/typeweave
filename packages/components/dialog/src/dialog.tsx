import { useControllableState } from '@gist-ui/use-controllable-state';
import { Slot } from '@gist-ui/slot';
import { useClickOutside } from '@gist-ui/use-click-outside';
import { usePress } from '@react-aria/interactions';
import { useScrollLock } from '@gist-ui/use-scroll-lock';
import { useCallbackRef } from '@gist-ui/use-callback-ref';
import { createPortal } from 'react-dom';
import { FocusTrap, FocusScope } from '@gist-ui/focus-trap';
import { createContextScope } from '@gist-ui/context';
import { useIsDisabled } from '@gist-ui/use-is-disabled';
import { useEffect, useId, useRef } from 'react';

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

Root.displayName = 'gist-ui.' + Root_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'Dialog.Trigger';

export interface TriggerProps {
  children: React.ReactNode;
}

export const Trigger = (props: TriggerProps) => {
  const { children } = props;

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
      {...pressProps}
    >
      {children}
    </Slot>
  );
};

Trigger.displayName = 'gist-ui.' + Trigger_Name;

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

Close.displayName = 'gist-ui.' + Close_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'Dialog.Portal';

export interface PortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
  const { children, container = document.body } = props;

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

Portal.displayName = 'gist-ui.' + Portal_Name;

// *-*-*-*-* Title *-*-*-*-*

const Title_Name = 'Dialog.Title';

export interface TitleProps {
  children?: React.ReactNode;
  className?: string;
}

export const Title = (props: TitleProps) => {
  const { children, className } = props;

  const rootContext = useRootContext(Title_Name);

  return (
    <div id={rootContext.titleId} className={className}>
      {children}
    </div>
  );
};

Title.displayName = 'gist-ui.' + Title_Name;

// *-*-*-*-* Description *-*-*-*-*

const Description_Name = 'Dialog.Description';

export interface DescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export const Description = (props: DescriptionProps) => {
  const { children, className } = props;

  const rootContext = useRootContext(Description_Name);

  return (
    <div id={rootContext.descriptionId} className={className}>
      {children}
    </div>
  );
};

Description.displayName = 'gist-ui.' + Description_Name;

// *-*-*-*-* Content *-*-*-*-*

const Content_Name = 'Dialog.Content';

export interface ContentProps {
  children?: React.ReactNode;
  className?: string;
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

export const Content = (props: ContentProps) => {
  const { children, className, noA11yDescription, noA11yTitle } = props;

  const rootContext = useRootContext(Content_Name);

  useScrollLock({ enabled: rootContext.isOpen });

  const setOutsideEle = useClickOutside<HTMLDivElement>({
    isDisabled: !rootContext.isOpen,
    callback: () => {
      rootContext.handleClose('outside');
    },
  });

  return (
    <FocusTrap
      ref={setOutsideEle}
      loop
      trapped
      scope={rootContext.scope}
      isDisabled={!rootContext.isOpen}
    >
      <div
        role="dialog"
        aria-labelledby={noA11yTitle ? undefined : rootContext.titleId}
        aria-describedby={
          noA11yDescription ? undefined : rootContext.descriptionId
        }
        aria-modal={true}
        id={rootContext.contentId}
        className={className}
      >
        {children}
      </div>
    </FocusTrap>
  );
};

Content.displayName = 'gist-ui.' + Content_Name;
