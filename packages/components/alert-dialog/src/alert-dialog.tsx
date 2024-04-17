import { createContextScope } from '@webbo-ui/context';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import { Slot } from '@webbo-ui/slot';
import { FocusScope, FocusTrap } from '@webbo-ui/focus-trap';
import { useScrollLock } from '@webbo-ui/use-scroll-lock';
import { createPortal } from 'react-dom';
import { AlertDialogVariantProps, alertDialog } from '@webbo-ui/theme';
import React from 'react';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';

// *-*-*-*-* Root *-*-*-*-*

interface RootContext {
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
  focusScope: FocusScope;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const Root_Name = 'AlertDialog.Root';

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(Root_Name);

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
}

export interface RootMethods {
  onClose: RootContext['handleClose'];
}

export const Root = React.forwardRef<RootMethods, RootProps>((props, ref) => {
  const { children, isOpen: isOpenProp, defaultOpen, onOpenChange } = props;

  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const focusScope = React.useRef<FocusScope>({
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

  const handleClose = useCallbackRef(() => {
    if (focusScope.paused) return;
    setOpen(false);
  });

  React.useImperativeHandle(ref, () => ({ onClose: handleClose }), [
    handleClose,
  ]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
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
      focusScope={focusScope}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      {children}
    </RootProvider>
  );
});

Root.displayName = 'webbo-ui.' + Root_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'AlertDialog.Trigger';

export interface TriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  virtual?: boolean;
  virtualElement?: HTMLElement | null;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { virtualElement, virtual, ...restProps } = props;

    const rootContext = useRootContext(Trigger_Name);

    const pointerEvents = usePointerEvents({ onPress: rootContext.handleOpen });

    const ariaHaspopup = 'dialog';
    const ariaExpanded = rootContext.isOpen;
    const ariaControls = rootContext.isOpen ? rootContext.contentId : undefined;
    const isOpen = rootContext.isOpen + '';

    React.useEffect(() => {
      if (!virtual || !virtualElement) return;

      virtualElement.ariaExpanded = ariaExpanded + '';
      virtualElement.ariaHasPopup = ariaHaspopup;
      virtualElement.dataset.open = isOpen;

      // @ts-expect-error ----
      virtualElement.onpointerdown = pointerEvents.onPointerDown;

      // @ts-expect-error ----
      virtualElement.onpointerup = pointerEvents.onPointerUp;
    }, [
      ariaExpanded,
      isOpen,
      pointerEvents.onPointerDown,
      pointerEvents.onPointerUp,
      virtual,
      virtualElement,
    ]);

    if (virtual) return null;

    return (
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...restProps}
        {...pointerEvents}
        ref={ref}
        role="button"
        data-open={isOpen}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      />
    );
  },
);

Trigger.displayName = 'webbo-ui.' + Trigger_Name;

// *-*-*-*-* Close *-*-*-*-*

const Close_Name = 'AlertDialog.Close';

export interface CloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Close = React.forwardRef<HTMLButtonElement, CloseProps>(
  (props, ref) => {
    const { ...restProps } = props;

    const rootContext = useRootContext(Close_Name);

    return <Slot {...restProps} onPress={rootContext.handleClose} ref={ref} />;
  },
);

Close.displayName = 'webbo-ui.' + Close_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'AlertDialog.Portal';

export interface PortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const rootContext = useRootContext(Portal_Name);

  return rootContext.isOpen ? createPortal(children, container) : null;
};

Portal.displayName = 'webbo-ui.' + Portal_Name;

// *-*-*-*-* Content *-*-*-*-*

const Content_Name = 'AlertDialog.Content';

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof alertDialog>>(Content_Name);

export interface ContentProps
  extends AlertDialogVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const {
      className,
      noA11yDescription,
      noA11yTitle,
      shadow = 'md',
      ...restProps
    } = props;

    const rootContext = useRootContext(Content_Name);

    useScrollLock();

    const styles = React.useMemo(() => alertDialog({ shadow }), [shadow]);

    return (
      <StylesProvider {...styles}>
        <FocusTrap
          loop
          trapped
          focusScope={rootContext.focusScope}
          disabled={!rootContext.isOpen}
          asChild
        >
          <div
            {...restProps}
            ref={ref}
            role="alertdialog"
            aria-labelledby={noA11yTitle ? undefined : rootContext.titleId}
            aria-describedby={
              noA11yDescription ? undefined : rootContext.descriptionId
            }
            aria-modal={true}
            id={rootContext.contentId}
            className={styles.content({ className })}
          />
        </FocusTrap>
      </StylesProvider>
    );
  },
);

Content.displayName = 'webbo-ui.' + Content_Name;

// *-*-*-*-* Title *-*-*-*-*

const Title_Name = 'AlertDialog.Title';

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Title = React.forwardRef<HTMLDivElement, TitleProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const rootContext = useRootContext(Title_Name);
    const stylesContext = useStylesContext(Title_Name);

    return (
      <div
        {...restProps}
        ref={ref}
        id={rootContext.titleId}
        className={stylesContext.title({ className })}
      />
    );
  },
);

Title.displayName = 'webbo-ui.' + Title_Name;

// *-*-*-*-* Description *-*-*-*-*

const Description_Name = 'AlertDialog.Description';

export interface DescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const Description = React.forwardRef<HTMLDivElement, DescriptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const rootContext = useRootContext(Description_Name);
    const stylesContext = useStylesContext(Description_Name);

    return (
      <div
        {...restProps}
        ref={ref}
        id={rootContext.descriptionId}
        className={stylesContext.description({ className })}
      />
    );
  },
);

Description.displayName = 'webbo-ui.' + Description_Name;

// *-*-*-*-* Actions *-*-*-*-*

const Actions_Name = 'AlertDialog.Actions';

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Actions = React.forwardRef<HTMLDivElement, OverlayProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const stylesContext = useStylesContext(Actions_Name);

    return (
      <div
        {...restProps}
        ref={ref}
        className={stylesContext.actions({ className })}
      />
    );
  },
);

Actions.displayName = 'webbo-ui.' + Actions_Name;
