import { createContextScope } from '@gist-ui/context';
import { Slot } from '@gist-ui/slot';
import * as Popper from '@gist-ui/popper';
import { useControllableState } from '@gist-ui/use-controllable-state';
import { useClickOutside } from '@gist-ui/use-click-outside';
import { useFocusVisible, useHover, usePress } from '@react-aria/interactions';
import { createPortal } from 'react-dom';
import { mergeProps, mergeRefs } from '@gist-ui/react-utils';
import { MenuVariantProps, menu, ClassValue } from '@gist-ui/theme';
import { useScrollLock } from '@gist-ui/use-scroll-lock';
import { useCallbackRef } from '@gist-ui/use-callback-ref';
import { useIsDisabled } from '@gist-ui/use-is-disabled';
import { VisuallyHidden } from '@gist-ui/visually-hidden';
import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';

const Root_Name = 'Menu.Root';

interface RootContext {
  isOpen: boolean;
  handleOpen(): void;
  handleClose(): void;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(Root_Name);

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Root = (props: RootProps) => {
  const { children, defaultOpen, isOpen: isOpenProp, onOpenChange } = props;

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: isOpenProp,
    onChange: onOpenChange,
    resetStateValue: false,
  });

  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallbackRef(() => {
    setIsOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    setIsOpen(false);
  });

  return (
    <RootProvider
      handleOpen={handleOpen}
      handleClose={handleClose}
      isOpen={isOpen}
      id={id}
      triggerRef={triggerRef}
    >
      <Popper.Root>{children}</Popper.Root>
    </RootProvider>
  );
};

Root.displayName = 'gist-ui.' + Root_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'Menu.Trigger';

export interface TriggerProps {
  children?: React.ReactNode;
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
        ref={mergeRefs(setElement, rootContext.triggerRef)}
        role="button"
        aria-haspopup="menu"
        aria-expanded={rootContext.isOpen}
        aria-controls={rootContext.isOpen ? rootContext.id : undefined}
        aria-label={a11yLabel}
        aria-describedby={a11yDescription}
        {...pressProps}
      >
        {children}
      </Slot>
    </Popper.Reference>
  );
};

Trigger.displayName = 'gist-ui.' + Trigger_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'Menu.Portal';

export interface PortalProps {
  children?: React.ReactNode;
  container?: Element;
}

export const Portal = ({ children, container }: PortalProps) => {
  const rootContext = useRootContext(Portal_Name);

  return (
    <>
      {rootContext.isOpen && createPortal(children, container || document.body)}
    </>
  );
};

Portal.displayName = 'gist-ui.' + Portal_Name;

// *-*-*-*-* Menu *-*-*-*-*

const Menu_Name = 'Menu.Menu';

type FocusableItem = {
  index: number;
  isDisabled: boolean;
  callback: () => void;
};

interface FocusContext {
  items: Record<string, FocusableItem>;
  focused: FocusableItem | null;
  setFocused: React.Dispatch<React.SetStateAction<FocusableItem | null>>;
}

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof menu>>(Menu_Name);

const [FocusProvider, useFocusContext] =
  createContextScope<FocusContext>(Menu_Name);

export interface MenuProps extends Popper.FloatingProps, MenuVariantProps {
  children?: React.ReactNode;
  className?: ClassValue;
  roleDescription?: string;
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const {
    children,
    className,
    shadow,
    roleDescription,
    arrowPadding = 10,
    boundaryPadding = 10,
    ...restProps
  } = props;

  const innerRef = useRef<HTMLUListElement>(null);

  const rootContext = useRootContext(Menu_Name);

  const items = useRef<Record<string, FocusableItem>>({}).current;
  const [focused, setFocused] = useState<FocusableItem | null>(null);

  const itemsLength = Object.keys(items).length;

  const { isFocusVisible } = useFocusVisible();

  const setOutsideEle = useClickOutside<HTMLUListElement>({
    isDisabled: !rootContext.isOpen,
    callback: rootContext.handleClose,
  });

  useScrollLock({ enabled: rootContext.isOpen });

  useEffect(() => {
    if (!rootContext.isOpen) return;

    innerRef.current?.focus?.();

    // index zero mean... we need to check 1st item also
    if (isFocusVisible) setFocused(getNext(createCustomItem(0), items));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusVisible]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const Tab = e.key === 'Tab';
    const ArrowDown = e.key === 'ArrowDown';
    const ArrowUp = e.key === 'ArrowUp';
    const Home = e.key === 'Home';
    const End = e.key === 'End';
    const Escape = e.key === 'Escape';
    const Enter = e.key === 'Enter';
    const Space = e.key === ' ';

    if (Escape) {
      setFocused(null);
      rootContext.handleClose();
      rootContext.triggerRef.current?.focus?.();
      return;
    }

    if (Tab) {
      rootContext.handleClose();
      return;
    }

    if (!itemsLength) return;

    if ((Enter || Space) && focused) {
      e.preventDefault();
      focused.callback();
      return;
    }

    if ((ArrowDown || ArrowUp) && !focused) {
      setFocused(getNext(createCustomItem(0), items));
      return;
    }

    if (ArrowDown && focused && focused.index < itemsLength) {
      setFocused(getNext(focused, items));
      return;
    }

    if (ArrowUp && focused && focused.index > 1) {
      setFocused(getPrevious(focused, items));
      return;
    }

    if (Home) {
      setFocused(getNext(createCustomItem(0), items));
      return;
    }

    if (End) {
      setFocused(getPrevious(createCustomItem(itemsLength + 1), items));
      return;
    }
  };

  const styles = useMemo(() => menu({ shadow }), [shadow]);

  return (
    <Popper.Floating
      arrowPadding={arrowPadding}
      boundaryPadding={boundaryPadding ?? 10}
      {...restProps}
    >
      <ul
        id={rootContext.id}
        role="menu"
        ref={mergeRefs(setOutsideEle, ref, innerRef)}
        className={styles.menu({ className })}
        onKeyDown={onKeyDown}
        aria-roledescription={roleDescription}
        tabIndex={-1}
      >
        <FocusProvider items={items} focused={focused} setFocused={setFocused}>
          <StylesProvider {...styles}>
            <VisuallyHidden>
              <button onPointerUp={rootContext.handleClose}>close</button>
            </VisuallyHidden>

            {children}

            <VisuallyHidden>
              <button onPointerUp={rootContext.handleClose}>close</button>
            </VisuallyHidden>
          </StylesProvider>
        </FocusProvider>
      </ul>
    </Popper.Floating>
  );
});

Menu.displayName = 'gist-ui.' + Menu_Name;

// *-*-*-*-* Item *-*-*-*-*

const Item_Name = 'Menu.Item';

export interface ItemProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  disableCloseOnPress?: boolean;
  className?: ClassValue;
  onPress?: () => void;
  asChild?: boolean;
}

export const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    children,
    isDisabled,
    onPress,
    disableCloseOnPress,
    className,
    asChild,
  } = props;

  const { handleClose } = useRootContext(Item_Name);
  const stylesContext = useStylesContext(Item_Name);
  const { items, focused, setFocused } = useFocusContext(Item_Name);

  const focusRef = useRef<FocusableItem>({
    callback: () => {},
    index: 0,
    isDisabled: false,
  }).current;

  const innerRef = useRef<HTMLLIElement>(null);

  const { hoverProps } = useHover({
    isDisabled,
    onHoverStart: () => setFocused(focusRef),
    onHoverEnd: () => setFocused(null),
  });

  const handlePress = useCallbackRef(() => {
    if (!disableCloseOnPress) handleClose();
    onPress?.();
  });

  const { pressProps } = usePress({
    isDisabled,
    onPress: handlePress,
  });

  useEffect(() => {
    focusRef.callback = handlePress;
    focusRef.isDisabled = !!isDisabled;
  }, [focusRef, handlePress, isDisabled]);

  useEffect(() => {
    const length = Object.keys(items).length;

    const index = length + 1;

    focusRef.index = index;

    items[index] = focusRef;
  }, [focusRef, items]);

  const Component = asChild ? Slot : 'li';

  return (
    <Component
      ref={mergeRefs(ref, innerRef)}
      role="menuitem"
      data-focused={focused === focusRef}
      data-disabled={!!isDisabled}
      aria-disabled={isDisabled}
      className={stylesContext.item({ className })}
      {...mergeProps(hoverProps, pressProps)}
    >
      <span></span>
      {children}
    </Component>
  );
});

Item.displayName = 'gist-ui.' + Item_Name;

// *-*-*-*-* Group *-*-*-*-*

const Label_Name = 'Menu.Label';

export interface LabelProps {
  children?: React.ReactNode;
  className?: ClassValue;
}

export const Label = (props: LabelProps) => {
  const { children, className } = props;

  const stylesContext = useStylesContext(Label_Name);

  return (
    <li role="none" className={stylesContext.label({ className })}>
      {children}
    </li>
  );
};

Label.displayName = 'gist-ui.' + Label_Name;

// *-*-*-*-* Group *-*-*-*-*

const Group_Name = 'Menu.Group';

export interface GroupProps {
  children?: React.ReactNode;
  className?: ClassValue;
  accessibleLabel?: string;
}

export const Group = (props: GroupProps) => {
  const { children, className, accessibleLabel } = props;

  const stylesContext = useStylesContext(Group_Name);

  return (
    <li role="none">
      <ul
        role="group"
        aria-label={accessibleLabel}
        className={stylesContext.group({ className })}
      >
        {children}
      </ul>
    </li>
  );
};

Group.displayName = 'gist-ui.' + Group_Name;

// *-*-*-*-* Separator *-*-*-*-*

const Separator_Name = 'Menu.Separator';

export interface SeparatorProps {
  className?: ClassValue;
}

export const Separator = (props: SeparatorProps) => {
  const { className } = props;

  const stylesContext = useStylesContext(Separator_Name);

  return (
    <div
      role="separator"
      className={stylesContext.separator({ className })}
    ></div>
  );
};

Separator.displayName = 'gist-ui.' + Separator_Name;

// *-*-*-*-* CheckboxItem *-*-*-*-*

const CheckboxItem_Name = 'Menu.CheckboxItem';

export interface CheckboxItemProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: ClassValue;
  asChild?: boolean;
}

export const CheckboxItem = forwardRef<HTMLLIElement, CheckboxItemProps>(
  (props, ref) => {
    const { children, isDisabled, className, checked, onChange, asChild } =
      props;

    const stylesContext = useStylesContext(CheckboxItem_Name);
    const { items, focused, setFocused } = useFocusContext(Item_Name);

    const focusRef = useRef<FocusableItem>({
      callback: () => {},
      index: 0,
      isDisabled: false,
    }).current;

    const innerRef = useRef<HTMLLIElement>(null);

    const { hoverProps } = useHover({
      isDisabled,
      onHoverStart: () => setFocused(focusRef),
      onHoverEnd: () => setFocused(null),
    });

    const hanldeChange = useCallbackRef(() => {
      onChange?.(!checked);
    });

    const { pressProps } = usePress({
      isDisabled,
      onPress: hanldeChange,
    });

    useEffect(() => {
      focusRef.callback = hanldeChange;
      focusRef.isDisabled = !!isDisabled;
    }, [focusRef, hanldeChange, isDisabled]);

    useEffect(() => {
      const length = Object.keys(items).length;

      const index = length + 1;

      focusRef.index = index;

      items[index] = focusRef;
    }, [focusRef, items]);

    const Component = asChild ? Slot : 'li';

    return (
      <Component
        ref={mergeRefs(ref, innerRef)}
        role="menuitemcheckbox"
        data-focused={focused === focusRef}
        data-disabled={!!isDisabled}
        data-checked={checked}
        aria-checked={checked}
        aria-disabled={isDisabled}
        className={stylesContext.item({ className })}
        {...mergeProps(hoverProps, pressProps)}
      >
        <span>
          {!checked ? null : (
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
              style={{ height: 11, width: 11 }}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          )}
        </span>

        {children}
      </Component>
    );
  },
);

CheckboxItem.displayName = 'gist-ui.' + CheckboxItem_Name;

// *-*-*-*-* RadioGroup *-*-*-*-*

const RadioGroup_Name = 'Menu.RadioGroup';

interface RadioGroupContext {
  onChange?: (value: string) => void;
  value?: string;
}

const [RadioGroupProvider, useRadioGroupContext] =
  createContextScope<RadioGroupContext>(RadioGroup_Name);

export interface RadioGroupProps extends GroupProps {
  children?: React.ReactNode;
  onChange?: (value: string) => void;
  value?: string;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    children,
    onChange: onChangeProp,
    value,
    accessibleLabel,
    className,
  } = props;

  const onChange = useCallbackRef(onChangeProp);

  return (
    <RadioGroupProvider onChange={onChange} value={value}>
      <Group accessibleLabel={accessibleLabel} className={className}>
        {children}
      </Group>
    </RadioGroupProvider>
  );
};

RadioGroup.displayName = 'gist-ui.' + RadioGroup_Name;

// *-*-*-*-* RadioItem *-*-*-*-*

const RadioItem_Name = 'Menu.RadioItem';

export interface RadioItemProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  value: string;
  className?: ClassValue;
  asChild?: boolean;
}

export const RadioItem = forwardRef<HTMLLIElement, RadioItemProps>(
  (props, ref) => {
    const { children, isDisabled, className, value, asChild } = props;

    const stylesContext = useStylesContext(RadioItem_Name);
    const groupContext = useRadioGroupContext(RadioItem_Name);
    const { items, focused, setFocused } = useFocusContext(Item_Name);

    const focusRef = useRef<FocusableItem>({
      callback: () => {},
      index: 0,
      isDisabled: false,
    }).current;

    const innerRef = useRef<HTMLLIElement>(null);

    const { hoverProps } = useHover({
      isDisabled,
      onHoverStart: () => setFocused(focusRef),
      onHoverEnd: () => setFocused(null),
    });

    const hanldeChange = useCallbackRef(() => {
      groupContext.onChange?.(value);
    });

    const { pressProps } = usePress({
      isDisabled,
      onPress: hanldeChange,
    });

    useEffect(() => {
      focusRef.callback = hanldeChange;
      focusRef.isDisabled = !!isDisabled;
    }, [focusRef, hanldeChange, isDisabled]);

    useEffect(() => {
      const length = Object.keys(items).length;

      const index = length + 1;

      focusRef.index = index;

      items[index] = focusRef;
    }, [focusRef, items]);

    const checked = value === groupContext.value;

    const Component = asChild ? Slot : 'li';

    return (
      <Component
        ref={mergeRefs(ref, innerRef)}
        role="menuitemradio"
        data-focused={focused === focusRef}
        data-disabled={!!isDisabled}
        data-checked={checked}
        aria-checked={checked}
        aria-disabled={isDisabled}
        className={stylesContext.item({ className })}
        {...mergeProps(hoverProps, pressProps)}
      >
        <span>
          {!checked ? null : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
            >
              <g>
                <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="4"
                  d="M24 33a9 9 0 100-18 9 9 0 000 18z"
                ></path>
              </g>
            </svg>
          )}
        </span>

        {children}
      </Component>
    );
  },
);

RadioItem.displayName = 'gist-ui.' + RadioItem_Name;

// *-*-*-*-* Utils *-*-*-*-*

const getNext = (
  current: FocusableItem,
  items: Record<string, FocusableItem>,
) => {
  for (let i = current.index + 1; i <= Object.keys(items).length; i++) {
    const focused = items[i];
    if (!focused.isDisabled) return focused;
  }

  return current;
};

const getPrevious = (
  current: FocusableItem,
  items: Record<string, FocusableItem>,
) => {
  for (let i = current.index - 1; i > 0; i--) {
    const focused = items[i];
    if (!focused.isDisabled) return focused;
  }

  return current;
};

const createCustomItem = (index: number) => ({
  index,
  isDisabled: false,
  callback: () => {},
});
