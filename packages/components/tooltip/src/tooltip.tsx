import { createPortal } from "react-dom";
import { useHover, useFocus, useFocusVisible, usePress } from "react-aria";
import { mergeRefs, mergeProps } from "@gist-ui/react-utils";
import { GistUiError, onlyChildError, validChildError } from "@gist-ui/error";
import { useControllableState } from "@gist-ui/use-controllable-state";
import { TooltipClassNames, TooltipVariantProps, tooltip } from "@gist-ui/theme";
import {
  Children,
  Dispatch,
  ForwardedRef,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  useFloating,
  autoUpdate,
  arrow,
  flip,
  shift,
  offset,
  OffsetOptions,
  limitShift,
  ShiftOptions,
  FlipOptions,
  hide,
  HideOptions,
  Placement,
  ReferenceType,
} from "@floating-ui/react-dom";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";

type Trigger = "hover" | "focus";

export interface TooltipProps extends TooltipVariantProps {
  children?: ReactNode;
  title?: string;
  classNames?: TooltipClassNames;
  placement?: Placement;
  middlewareOptions?: {
    offset?: OffsetOptions;
    shift?: ShiftOptions;
    flip?: FlipOptions;
    hide?: HideOptions;
  };
  disableInteractive?: boolean;
  showDelay?: number;
  hideDelay?: number;
  trigger?: Trigger;
  arrowHide?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  portalContainer?: Element;
}

interface Context {
  handleShow: (a?: boolean) => void;
  handleHide: (a?: boolean) => void;
  trigger?: Trigger;
  isHovered: MutableRefObject<boolean>;
  isFocused: MutableRefObject<boolean>;
  tooltipId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setReference: (node: ReferenceType | null) => void;
}

const TooltipContext = createContext<Context | null>(null);

export const Root = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    title,
    children,
    classNames,
    middlewareOptions,
    placement: position,
    showDelay = 100,
    hideDelay = 300,
    trigger,
    disableInteractive,
    isOpen: isOpenProp,
    onOpenChange,
    defaultOpen = false,
    portalContainer = document.body,
  } = props;

  const Component = "div";

  const [isOpen, setIsOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const tooltipId = useId();
  const arrowRef = useRef<HTMLDivElement>(null);

  const isHovered = useRef(false);
  const isFocused = useRef(false);

  const showTimeout = useRef<NodeJS.Timeout>();
  const hideTimeout = useRef<NodeJS.Timeout>();

  const showTooltip = (immediate?: boolean) => {
    clearTimeout(hideTimeout.current);
    hideTimeout.current = undefined;

    if (isOpen) return;

    if (!immediate && showDelay > 0) {
      showTimeout.current = setTimeout(() => {
        setIsOpen(true);
      }, showDelay);
    } else {
      setIsOpen(true);
    }
  };

  const handleShow = (immediate = false) => {
    if (isHovered.current || isFocused.current) {
      showTooltip(immediate);
    }
  };

  const hideTooltip = useCallback(
    (immediate?: boolean) => {
      if (immediate || hideDelay <= 0) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = undefined;
        setIsOpen(false);
      } else {
        hideTimeout.current = setTimeout(() => {
          setIsOpen(false);
        }, hideDelay);
      }

      clearTimeout(showTimeout.current);
      showTimeout.current = undefined;
    },
    [hideDelay, setIsOpen],
  );

  const handleHide = (immediate = false) => {
    if (!isHovered.current && !isFocused.current) {
      hideTooltip(immediate);
    }
  };

  useEffect(() => {
    if (!isDisabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        hideTooltip(true);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown, true);
      return () => {
        document.removeEventListener("keydown", onKeyDown, true);
      };
    }
  }, [hideTooltip, isDisabled, isOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(showTimeout.current);
      clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen && hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = undefined;
    }
  }, [isOpen]);

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    open: isOpen,
    whileElementsMounted: autoUpdate,
    placement: position,
    middleware: [
      offset({ mainAxis: 10, alignmentAxis: 5 }),
      shift({
        limiter: limitShift({ offset: 10 }),
        ...middlewareOptions?.shift,
      }),
      flip(middlewareOptions?.flip),
      arrow({ element: arrowRef, padding: 10 }),
      hide(middlewareOptions?.hide),
    ],
  });

  const { hoverProps: tooltipHoverProps } = useHover(
    isDisabled
      ? { isDisabled: true }
      : {
          isDisabled: disableInteractive,
          onHoverStart: () => {
            showTooltip(true);
          },
          onHoverEnd: () => {
            hideTooltip();
          },
        },
  );

  const styles = tooltip(props);

  const childCount = Children.count(children);
  if (!childCount) return;
  if (childCount > 1) throw new GistUiError("tooltip", onlyChildError);
  if (!isValidElement(children)) throw new GistUiError("tooltip", validChildError);

  const [side] = placement.split("-") as [Side, Alignment];

  const isVerticalSide = side === "bottom" || side === "top";

  const tooltipHtml = (
    <Component
      ref={mergeRefs(ref, refs.setFloating)}
      className={styles.base({ className: classNames?.base })}
      id={tooltipId}
      style={{
        ...floatingStyles,
        visibility: middlewareData.hide?.escaped ? "hidden" : "visible",
      }}
      role="tooltip"
      {...tooltipHoverProps}
    >
      <div
        ref={arrowRef}
        data-side={side}
        style={{
          [isVerticalSide ? "left" : "top"]: isVerticalSide
            ? middlewareData.arrow?.x
            : middlewareData.arrow?.y,
          [side]: "calc(100% - 1px)",
        }}
        className={styles.arrow({ className: classNames?.arrow })}
      />
      {title}
    </Component>
  );

  return (
    <TooltipContext.Provider
      value={{
        handleShow,
        handleHide,
        trigger,
        isHovered,
        isFocused,
        tooltipId,
        isOpen,
        setIsOpen,
        setReference: refs.setReference,
        isDisabled,
        setIsDisabled,
      }}
    >
      {children}

      {isOpen && createPortal(tooltipHtml, portalContainer)}
    </TooltipContext.Provider>
  );
});

Root.displayName = "gist-ui.TooltipRoot";

export const Trigger = ({ children }: { children: ReactNode }) => {
  const context = useContext(TooltipContext);
  const [toObserver, setToObserver] = useState<HTMLElement | null>(null);

  const { hoverProps } = useHover({
    isDisabled: context?.isDisabled,
    onHoverStart: () => {
      if (context!.trigger === "focus") return;

      context!.isHovered.current = true;
      context!.isFocused.current = false;

      context!.handleShow();
    },
    onHoverEnd: () => {
      if (context!.trigger === "focus") return;

      context!.isFocused.current = false;
      context!.isHovered.current = false;
      context!.handleHide();
    },
  });

  const { pressProps } = usePress({
    isDisabled: context?.isDisabled,
    onPressStart: () => {
      context!.isFocused.current = false;
      context!.isHovered.current = false;
      context!.handleHide(true);
    },
  });

  const { isFocusVisible } = useFocusVisible();
  const { focusProps } = useFocus({
    isDisabled: context?.isDisabled,
    onFocus: () => {
      if (isFocusVisible) {
        context!.isFocused.current = true;
        context!.isHovered.current = false;
        context!.handleShow(true);
      }
    },
    onBlur: () => {
      context!.isFocused.current = false;
      context!.isHovered.current = false;
      context!.handleHide(true);
    },
  });

  useEffect(() => {
    if (!toObserver) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if ((mutation.target as unknown as { disabled?: boolean }).disabled) {
          context?.setIsOpen(false);
          context?.setIsDisabled(true);
        } else {
          context?.setIsDisabled(false);
        }
      }
    });

    observer.observe(toObserver, { attributeFilter: ["disabled"] });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toObserver]);

  if (!context) throw new GistUiError("tootipTrigger", 'must be used inside tooltip "Root"');

  const childCount = Children.count(children);
  if (!childCount) return;
  if (childCount > 1) throw new GistUiError("tooltip", onlyChildError);
  if (!isValidElement(children)) throw new GistUiError("tooltip", validChildError);

  return (
    <>
      {cloneElement(children, {
        ref: mergeRefs(context.setReference, setToObserver as ForwardedRef<Element>),
        "aria-describedby": context!.isOpen ? context!.tooltipId : undefined,
        tabIndex: 0,
        ...mergeProps(hoverProps, focusProps, pressProps, children.props),
      } as Partial<unknown>)}
    </>
  );
};

Trigger.displayName = "gist-ui.TooltipTrigger";

export const Portal = ({ children, container }: { children: ReactNode; container: Element }) => {
  const context = useContext(TooltipContext);

  if (!context) throw new GistUiError("tootipTrigger", 'must be used inside tooltip "Root"');

  return <>{context.isOpen && createPortal(children, container || document.body)}</>;
};

Portal.displayName = "gist-ui.TooltipPortal";
