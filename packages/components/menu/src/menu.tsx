'use client';

import { createContextScope } from '@webbo-ui/context';
import { Slot } from '@webbo-ui/slot';
import * as Popper from '@webbo-ui/popper';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { useClickOutside } from '@webbo-ui/use-click-outside';
import { createPortal } from 'react-dom';
import { mergeRefs } from '@webbo-ui/react-utils';
import { MenuVariantProps, menu } from '@webbo-ui/theme';
import { useScrollLock } from '@webbo-ui/use-scroll-lock';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import { createCollection } from '@webbo-ui/use-collection';
import { VisuallyHidden } from '@webbo-ui/visually-hidden';
import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';

const Root_Name = 'Menu.Root';

interface RootContext {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  loop?: boolean;
}

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(Root_Name);

type CollectionItem = {
  disabled: boolean;
  isFocused: boolean;
  id: string;
};

const [Collection, useCollection] = createCollection<
  HTMLLIElement,
  CollectionItem
>(Root_Name);

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  loop?: boolean;
}

export const Root = (props: RootProps) => {
  const {
    children,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange,
    loop,
  } = props;

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: isOpenProp,
    onChange: onOpenChange,
  });

  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallbackRef(() => {
    setIsOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  });

  return (
    <RootProvider
      handleOpen={handleOpen}
      handleClose={handleClose}
      isOpen={isOpen}
      id={id}
      triggerRef={triggerRef}
      loop={loop}
    >
      <Collection.Provider>
        <Popper.Root>{children}</Popper.Root>
      </Collection.Provider>
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + Root_Name;

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

  const pointerEvents = usePointerEvents({ onPress: rootContext.handleOpen });

  return (
    <Popper.Reference>
      <Slot
        ref={rootContext.triggerRef}
        role="button"
        aria-haspopup="menu"
        aria-expanded={rootContext.isOpen}
        aria-controls={rootContext.isOpen ? rootContext.id : undefined}
        aria-label={a11yLabel}
        aria-describedby={a11yDescription}
        {...pointerEvents}
        onKeyDown={(e: React.KeyboardEvent) => {
          const key = e.key;

          if (![' ', 'Enter'].includes(key)) return;

          e.preventDefault();
          rootContext.handleOpen();
        }}
      >
        {children}
      </Slot>
    </Popper.Reference>
  );
};

Trigger.displayName = 'webbo-ui.' + Trigger_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'Menu.Portal';

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

// *-*-*-*-* Menu *-*-*-*-*

const Menu_Name = 'Menu.Menu';

interface MenuContext {
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
}

const [MenuProvider, useMenuContext] =
  createContextScope<MenuContext>(Menu_Name);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof menu>>(Menu_Name);

export interface MenuProps extends Popper.FloatingProps, MenuVariantProps {
  children?: React.ReactNode;
  className?: string;
  roleDescription?: string;
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const {
    children,
    className,
    shadow = 'md',
    roleDescription,
    arrowPadding = 10,
    boundaryPadding = 10,
    ...restProps
  } = props;

  const innerRef = useRef<HTMLUListElement>(null);

  const rootContext = useRootContext(Menu_Name);

  const [focused, setFocused] = useState('');

  const setOutsideEle = useClickOutside<HTMLUListElement>({
    callback: (e) => {
      if (rootContext.triggerRef.current?.contains(e.target as Node)) return;
      rootContext.handleClose();
    },
  });

  useScrollLock();

  const getItems = useCollection();

  useEffect(() => {
    innerRef.current?.focus();
  }, []);

  const onkeydown = (e: React.KeyboardEvent) => {
    const key = e.key;

    const ArrowDown = key === 'ArrowDown';
    const ArrowUp = key === 'ArrowUp';

    const activeItems = getItems().filter((item) => !item.disabled);

    const elements = activeItems.map((item) => item.ref.current!);

    const currentIndex = activeItems.findIndex((ele) => ele.isFocused);

    // either no menuitem is focused or loop from end to first
    if (
      (currentIndex === -1 && ArrowDown) ||
      (currentIndex === elements.length - 1 && rootContext.loop && ArrowDown)
    ) {
      const index = 0;
      elements[index].focus();
      setFocused(activeItems[index].id);
      return;
    }

    // loop from first to end when either no menuitem is focused or first is focused
    if (
      (currentIndex === 0 || currentIndex === -1) &&
      rootContext.loop &&
      ArrowUp
    ) {
      const index = elements.length - 1;
      elements[index].focus();
      setFocused(activeItems[index].id);
      return;
    }

    if (ArrowDown && currentIndex >= 0 && currentIndex < elements.length - 1) {
      const index = currentIndex + 1;
      elements[index].focus();
      setFocused(activeItems[index].id);
      return;
    }

    if (ArrowUp && currentIndex > 0 && currentIndex <= elements.length - 1) {
      const index = currentIndex - 1;
      elements[index].focus();
      setFocused(activeItems[index].id);
      return;
    }
  };

  const styles = useMemo(() => menu({ shadow }), [shadow]);

  return (
    <MenuProvider setFocused={setFocused} focused={focused}>
      <Collection.Parent>
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
            aria-roledescription={roleDescription}
            tabIndex={-1}
            onKeyDown={onkeydown}
            onPointerLeave={() => {
              setFocused('');
            }}
          >
            <StylesProvider {...styles}>
              <VisuallyHidden>
                <button onPointerUp={rootContext.handleClose}>close</button>
              </VisuallyHidden>

              {children}

              <VisuallyHidden>
                <button onPointerUp={rootContext.handleClose}>close</button>
              </VisuallyHidden>
            </StylesProvider>
          </ul>
        </Popper.Floating>
      </Collection.Parent>
    </MenuProvider>
  );
});

Menu.displayName = 'webbo-ui.' + Menu_Name;

// *-*-*-*-* Item *-*-*-*-*

const Item_Name = 'Menu.Item';

export interface ItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  disableCloseOnPress?: boolean;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  onPress?: () => void;
  asChild?: boolean;
}

const ItemImp = forwardRef<
  HTMLLIElement,
  ItemProps & React.LiHTMLAttributes<HTMLLIElement>
>((props, ref) => {
  const { children, disabled, asChild, onPress, ...rest } = props;

  const id = useId();

  const menuContext = useMenuContext(Item_Name);

  const Component = asChild ? Slot : 'li';

  const isFocused = menuContext.focused === id;

  const pointerEvents = usePointerEvents({ onPress: () => onPress?.() });

  return (
    <Collection.Item disabled={!!disabled} isFocused={isFocused} id={id}>
      <Component
        {...rest}
        ref={ref}
        data-disabled={!!disabled}
        aria-disabled={disabled}
        data-focused={isFocused}
        tabIndex={isFocused ? 0 : -1}
        onPointerEnter={() => {
          if (disabled) return;
          menuContext.setFocused(id);
        }}
        {...pointerEvents}
        onKeyDown={(e) => {
          const key = e.key;

          if (![' ', 'Tab'].includes(key)) return;
          e.preventDefault();
          onPress?.();
        }}
      >
        {children}
      </Component>
    </Collection.Item>
  );
});

ItemImp.displayName = 'webbo-ui.' + Item_Name;

export const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    children,
    onPress,
    disableCloseOnPress,
    classNames,
    disabled,
    asChild,
  } = props;

  const rootContext = useRootContext(Item_Name);
  const stylesContext = useStylesContext(Item_Name);

  return (
    <ItemImp
      ref={ref}
      role="menuitem"
      className={stylesContext.item({ className: classNames?.item })}
      disabled={disabled}
      asChild={asChild}
      onPress={() => {
        if (!disableCloseOnPress) rootContext.handleClose();
        onPress?.();
      }}
    >
      <span
        className={stylesContext.itemIcon({
          className: classNames?.itemIcon,
        })}
      ></span>
      <span
        className={stylesContext.itemContent({
          className: classNames?.itemContent,
        })}
      >
        {children}
      </span>
    </ItemImp>
  );
});

Item.displayName = 'webbo-ui.' + Item_Name;

// *-*-*-*-* Label *-*-*-*-*

const Label_Name = 'Menu.Label';

export interface LabelProps {
  children?: React.ReactNode;
  className?: string;
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

Label.displayName = 'webbo-ui.' + Label_Name;

// *-*-*-*-* Group *-*-*-*-*

const Group_Name = 'Menu.Group';

export interface GroupProps {
  children?: React.ReactNode;
  className?: string;
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

Group.displayName = 'webbo-ui.' + Group_Name;

// *-*-*-*-* Separator *-*-*-*-*

const Separator_Name = 'Menu.Separator';

export interface SeparatorProps {
  className?: string;
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

Separator.displayName = 'webbo-ui.' + Separator_Name;

// *-*-*-*-* CheckboxItem *-*-*-*-*

const CheckboxItem_Name = 'Menu.CheckboxItem';

export interface CheckboxItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  asChild?: boolean;
  disableCloseOnChange?: boolean;
  icon?: React.ReactNode;
}

const checkbox_icon = (
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
);

export const CheckboxItem = forwardRef<HTMLLIElement, CheckboxItemProps>(
  (props, ref) => {
    const {
      children,
      classNames,
      checked,
      onChange,
      disabled,
      asChild,
      icon = checkbox_icon,
      disableCloseOnChange = true,
    } = props;

    const stylesContext = useStylesContext(CheckboxItem_Name);
    const rootContext = useRootContext(CheckboxItem_Name);

    return (
      <ItemImp
        ref={ref}
        role="menuitemcheckbox"
        data-checked={checked}
        aria-checked={checked}
        className={stylesContext.item({ className: classNames?.item })}
        disabled={disabled}
        asChild={asChild}
        onPress={() => {
          if (!disableCloseOnChange) rootContext.handleClose();
          onChange?.(!checked);
        }}
      >
        <span
          className={stylesContext.itemIcon({
            className: classNames?.itemIcon,
          })}
        >
          {!checked ? null : icon}
        </span>

        <span
          className={stylesContext.itemContent({
            className: classNames?.itemContent,
          })}
        >
          {children}
        </span>
      </ItemImp>
    );
  },
);

CheckboxItem.displayName = 'webbo-ui.' + CheckboxItem_Name;

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

RadioGroup.displayName = 'webbo-ui.' + RadioGroup_Name;

// *-*-*-*-* RadioItem *-*-*-*-*

const RadioItem_Name = 'Menu.RadioItem';

export interface RadioItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  value: string;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  asChild?: boolean;
  icon?: React.ReactNode;
  disableCloseOnChange?: boolean;
}

const radio_icon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48">
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
);

export const RadioItem = forwardRef<HTMLLIElement, RadioItemProps>(
  (props, ref) => {
    const {
      children,
      disabled,
      classNames,
      value,
      asChild,
      icon = radio_icon,
      disableCloseOnChange = true,
    } = props;

    const stylesContext = useStylesContext(RadioItem_Name);
    const rootContext = useRootContext(CheckboxItem_Name);
    const groupContext = useRadioGroupContext(RadioItem_Name);

    const checked = value === groupContext.value;

    return (
      <ItemImp
        ref={ref}
        role="menuitemradio"
        data-checked={checked}
        aria-checked={checked}
        className={stylesContext.item({ className: classNames?.item })}
        disabled={disabled}
        asChild={asChild}
        onPress={() => {
          if (!disableCloseOnChange) rootContext.handleClose();
          groupContext.onChange?.(value);
        }}
      >
        <span
          className={stylesContext.itemIcon({
            className: classNames?.itemIcon,
          })}
        >
          {!checked ? null : icon}
        </span>

        <span
          className={stylesContext.itemContent({
            className: classNames?.itemContent,
          })}
        >
          {children}
        </span>
      </ItemImp>
    );
  },
);

RadioItem.displayName = 'webbo-ui.' + RadioItem_Name;
