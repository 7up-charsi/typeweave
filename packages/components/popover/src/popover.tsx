'use client';

import { Slot } from '@webbo-ui/slot';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { FocusTrap } from '@webbo-ui/focus-trap';
import { useClickOutside } from '@webbo-ui/use-click-outside';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import { usePress } from '@react-aria/interactions';
import * as Popper from '@webbo-ui/popper';
import { createPortal } from 'react-dom';
import { useIsDisabled } from '@webbo-ui/use-is-disabled';
import { createContextScope } from '@webbo-ui/context';
import { useEffect, useId, useMemo } from 'react';
import { VisuallyHidden } from '@webbo-ui/visually-hidden';
import { mergeRefs } from '@webbo-ui/react-utils';
import { PopoverVariantProps, popover } from '@webbo-ui/theme';

interface PopoverContext {
  isOpen: boolean;
  handleOpen(): void;
  handleClose(): void;
  keepMounted: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const Popover_Name = 'Popover.Root';

const [RootProvider, useRootContext] =
  createContextScope<PopoverContext>(Popover_Name);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof popover>>(Popover_Name);

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  children?: React.ReactNode;
  /**
   * This prop is used for controled state
   * @default undefined
   */
  isOpen?: boolean;
  /**
   * This prop is used for controled state
   * @default undefined
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * @default undefined
   */
  defaultOpen?: boolean;
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
    defaultOpen,
    isOpen: openProp,
    onOpenChange,
    keepMounted = false,
  } = props;

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
    value: openProp,
    resetStateValue: false,
  });

  const contentId = useId();
  const titleId = useId();
  const descriptionId = useId();

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    setOpen(false);
  });

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      handleClose();
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handleClose, isOpen]);

  return (
    <RootProvider
      handleOpen={handleOpen}
      handleClose={handleClose}
      isOpen={isOpen}
      keepMounted={keepMounted}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <Popper.Root>{children}</Popper.Root>
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + Popover_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'Popover.Trigger';

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
    <Popper.Reference>
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
    </Popper.Reference>
  );
};

Trigger.displayName = 'webbo-ui.' + Trigger_Name;

// *-*-*-*-* Close *-*-*-*-*

const Close_Name = 'Popover.Close';

export interface CloseProps {
  children: React.ReactNode;
}

export const Close = (props: CloseProps) => {
  const { children } = props;

  const rootContext = useRootContext(Close_Name);

  const { setElement, isDisabled } = useIsDisabled();

  const { pressProps } = usePress({
    isDisabled,
    onPress: rootContext.handleClose,
  });

  return (
    <Slot ref={setElement} {...pressProps}>
      {children}
    </Slot>
  );
};

Close.displayName = 'webbo-ui.' + Close_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'Popover.Portal';

export interface PortalProps {
  children?: React.ReactNode;
  container?: Element;
}

export const Portal = ({
  children,
  container = globalThis?.document?.body,
}: PortalProps) => {
  const rootContext = useRootContext(Portal_Name);

  return <>{rootContext.isOpen && createPortal(children, container)}</>;
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
  const styles = useStylesContext(Title_Name);

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

const Content_Name = 'Popover.Content';

export interface ContentProps
  extends Popper.FloatingProps,
    PopoverVariantProps {
  children?: React.ReactNode;
  className?: string;
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

export const Content = (props: ContentProps) => {
  const {
    children,
    arrowPadding = 10,
    className,
    noA11yDescription,
    noA11yTitle,
    shadow,
    ...restProps
  } = props;

  const rootContext = useRootContext(Content_Name);

  const setOutsideEle = useClickOutside({
    isDisabled: !rootContext.isOpen,
    callback: () => {
      rootContext.handleClose();
    },
  });

  const styles = useMemo(() => popover({ shadow }), [shadow]);

  return (
    <Popper.Floating arrowPadding={arrowPadding} {...restProps}>
      {({ floatingRef, style }) => (
        <StylesProvider {...styles}>
          <FocusTrap loop trapped>
            <div
              ref={mergeRefs(floatingRef, setOutsideEle)}
              role="dialog"
              aria-labelledby={noA11yTitle ? undefined : rootContext.titleId}
              aria-describedby={
                noA11yDescription ? undefined : rootContext.descriptionId
              }
              id={rootContext.contentId}
              className={styles.content({ className })}
              style={style}
            >
              <VisuallyHidden>
                <button onPointerUp={rootContext.handleClose}>close </button>
              </VisuallyHidden>

              {children}

              <VisuallyHidden>
                <button onPointerUp={rootContext.handleClose}>close </button>
              </VisuallyHidden>
            </div>
          </FocusTrap>
        </StylesProvider>
      )}
    </Popper.Floating>
  );
};

Content.displayName = 'webbo-ui.' + Content_Name;
