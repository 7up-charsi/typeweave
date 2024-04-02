import { Slot } from '@webbo-ui/slot';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { FocusTrap } from '@webbo-ui/focus-trap';
import { useClickOutside } from '@webbo-ui/use-click-outside';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import * as Popper from '@webbo-ui/popper';
import { createPortal } from 'react-dom';
import { createContextScope } from '@webbo-ui/context';
import { forwardRef, useEffect, useId, useMemo, useRef } from 'react';
import { VisuallyHidden } from '@webbo-ui/visually-hidden';
import { mergeRefs } from '@webbo-ui/react-utils';
import { PopoverVariantProps, popover } from '@webbo-ui/theme';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';

interface PopoverContext {
  isOpen: boolean;
  handleOpen(): void;
  handleClose(): void;
  keepMounted: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
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
  });

  const contentId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

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
      triggerRef={triggerRef}
    >
      <Popper.Root>{children}</Popper.Root>
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + Popover_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'Popover.Trigger';

export interface TriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { onPointerDown, onPointerUp, ...restProps } = props;

    const rootContext = useRootContext(Trigger_Name);

    const pointerEvents = usePointerEvents({
      onPress: rootContext.handleOpen,
      onPointerDown,
      onPointerUp,
    });

    return (
      <Popper.Reference>
        <Slot
          {...restProps}
          ref={mergeRefs(ref, rootContext.triggerRef)}
          aria-expanded={rootContext.isOpen}
          aria-controls={rootContext.isOpen ? rootContext.contentId : undefined}
          {...pointerEvents}
        />
      </Popper.Reference>
    );
  },
);

Trigger.displayName = 'webbo-ui.' + Trigger_Name;

// *-*-*-*-* Close *-*-*-*-*

const Close_Name = 'Popover.Close';

export interface CloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Close = forwardRef<HTMLButtonElement, CloseProps>((props, ref) => {
  const { onPointerDown, onPointerUp, ...restProps } = props;

  const rootContext = useRootContext(Close_Name);

  const pointerEvents = usePointerEvents({
    onPress: rootContext.handleClose,
    onPointerDown,
    onPointerUp,
  });

  return <Slot {...restProps} ref={ref} {...pointerEvents} />;
});

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

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { className, ...restProps } = props;

  const rootContext = useRootContext(Title_Name);
  const styles = useStylesContext(Title_Name);

  return (
    <div
      {...restProps}
      ref={ref}
      id={rootContext.titleId}
      className={styles.title({ className })}
    />
  );
});

Title.displayName = 'webbo-ui.' + Title_Name;

// *-*-*-*-* Description *-*-*-*-*

const Description_Name = 'Dialog.Description';

export interface DescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const rootContext = useRootContext(Description_Name);
    const styles = useStylesContext(Description_Name);

    return (
      <div
        {...restProps}
        ref={ref}
        id={rootContext.descriptionId}
        className={styles.description({ className })}
      />
    );
  },
);

Description.displayName = 'webbo-ui.' + Description_Name;

// *-*-*-*-* Content *-*-*-*-*

const Content_Name = 'Popover.Content';

export interface ContentProps
  extends Omit<Popper.FloatingProps, 'children'>,
    PopoverVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
  loop?: boolean;
  trapped?: boolean;
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const {
      children,
      className,
      noA11yDescription,
      noA11yTitle,
      placement,
      updatePositionStrategy,
      mainOffset,
      alignOffset,
      arrow,
      sticky,
      hideWhenDetached,
      fallbackPlacements,
      allowMainAxisFlip,
      allowCrossAxisFlip,
      clippingBoundary,
      shadow = 'md',
      loop = true,
      trapped = true,
      arrowPadding = 10,
      boundaryPadding = 10,
      ...restProps
    } = props;

    const rootContext = useRootContext(Content_Name);

    const setOutsideEle = useClickOutside({
      callback: (e) => {
        if (rootContext.triggerRef.current?.contains(e.target as Node)) return;
        if ((e.target as HTMLElement).closest('[role=dialog]')) return;

        rootContext.handleClose();
      },
    });

    const styles = useMemo(() => popover({ shadow }), [shadow]);

    return (
      <StylesProvider {...styles}>
        <Popper.Floating
          arrowPadding={arrowPadding}
          placement={placement}
          updatePositionStrategy={updatePositionStrategy}
          mainOffset={mainOffset}
          alignOffset={alignOffset}
          arrow={arrow}
          sticky={sticky}
          hideWhenDetached={hideWhenDetached}
          fallbackPlacements={fallbackPlacements}
          allowMainAxisFlip={allowMainAxisFlip}
          allowCrossAxisFlip={allowCrossAxisFlip}
          clippingBoundary={clippingBoundary}
          boundaryPadding={boundaryPadding}
        >
          <FocusTrap loop={loop} trapped={trapped} asChild>
            <div
              {...restProps}
              ref={mergeRefs(ref, setOutsideEle)}
              role="dialog"
              aria-labelledby={noA11yTitle ? undefined : rootContext.titleId}
              aria-describedby={
                noA11yDescription ? undefined : rootContext.descriptionId
              }
              id={rootContext.contentId}
              className={styles.content({ className })}
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
        </Popper.Floating>
      </StylesProvider>
    );
  },
);

Content.displayName = 'webbo-ui.' + Content_Name;
