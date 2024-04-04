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
import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import { Icon } from '@webbo-ui/icon';

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
  disableCloseOnEscape?: boolean;
}

export const Root = (props: RootProps) => {
  const {
    children,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange,
    loop,
    disableCloseOnEscape,
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
    if (!isOpen) return;

    setIsOpen(false);
    triggerRef.current?.focus();
  });

  React.useEffect(() => {
    if (disableCloseOnEscape) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [disableCloseOnEscape, handleClose]);

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

export interface TriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { ...restProps } = props;

    const rootContext = useRootContext(Trigger_Name);

    return (
      <Popper.Reference>
        <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
          {...restProps}
          ref={mergeRefs(ref, rootContext.triggerRef)}
          role="button"
          aria-haspopup="menu"
          aria-expanded={rootContext.isOpen}
          aria-controls={rootContext.isOpen ? rootContext.id : undefined}
          // @ts-expect-error onPress does not exist
          onPress={rootContext.handleOpen}
          onKeyDown={(e: React.KeyboardEvent) => {
            const key = e.key;

            if (![' ', 'Enter'].includes(key)) return;

            e.preventDefault();
            rootContext.handleOpen();
          }}
        />
      </Popper.Reference>
    );
  },
);

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

export interface MenuProps
  extends Omit<Popper.FloatingProps, 'children'>,
    MenuVariantProps,
    React.HTMLAttributes<HTMLUListElement> {}

export const Menu = forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const {
    children,
    className,
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
    arrowPadding = 10,
    boundaryPadding = 10,
    ...restProps
  } = props;

  const innerRef = useRef<HTMLUListElement>(null);

  const rootContext = useRootContext(Menu_Name);

  const [focused, setFocused] = useState('');

  const searchState = useRef<{
    timer?: ReturnType<typeof setTimeout>;
    chars: string;
  }>({ chars: '' }).current;

  const setOutsideEle = useClickOutside({
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

  const handleCharSearch = (e: React.KeyboardEvent) => {
    const char = e.key;

    if (char.length !== 1 || e.repeat) return;

    const activeItems = getItems().filter((item) => !item.disabled);

    const elements = activeItems.map((item) => item.ref.current!);

    const currentIndex = activeItems.findIndex((ele) => ele.isFocused);

    if (!elements.length) return;

    clearTimeout(searchState.timer);

    searchState.timer = setTimeout(() => {
      searchState.chars = '';
    }, 500);

    searchState.chars += char;

    const startIndex =
      currentIndex || currentIndex === 0 ? currentIndex + 1 : 0;

    const orderedOptions = [
      ...activeItems.slice(startIndex),
      ...activeItems.slice(0, startIndex),
    ];

    const filter = searchState.chars.toLowerCase();

    const excatMatch = orderedOptions.find((ele) => {
      const span = ele.ref.current?.querySelectorAll('span')[1];

      if (span && span.firstChild?.nodeType === Node.TEXT_NODE)
        return span.firstChild.nodeValue?.toLowerCase().startsWith(filter);
      else return false;
    });

    if (excatMatch) {
      setFocused(excatMatch.id);
      return;
    }

    const sameLetters = filter
      .split('')
      .every((letter) => letter.toLowerCase() === filter[0]);

    if (sameLetters) {
      const matched = orderedOptions.find((ele) => {
        const span = ele.ref.current?.querySelectorAll('span')[1];

        if (span && span.firstChild?.nodeType === Node.TEXT_NODE)
          return span.firstChild.nodeValue?.toLowerCase().startsWith(filter);
        else return false;
      });

      if (matched) setFocused(matched.id);
    }
  };

  const styles = useMemo(() => menu({ shadow }), [shadow]);

  return (
    <MenuProvider setFocused={setFocused} focused={focused}>
      <Collection.Parent>
        <Popper.Floating
          arrowPadding={arrowPadding}
          boundaryPadding={boundaryPadding ?? 10}
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
        >
          <ul
            {...restProps}
            id={rootContext.id}
            role="menu"
            ref={mergeRefs(setOutsideEle, ref, innerRef)}
            className={styles.menu({ className })}
            tabIndex={-1}
            onKeyDown={(e) => {
              onkeydown(e);
              handleCharSearch(e);
            }}
            onPointerLeave={(e) => {
              restProps.onPointerLeave?.(e);
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

export interface ItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  disableCloseOnPress?: boolean;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  onPress?: () => void;
  icon?: React.ReactNode;
}

const ItemImp = forwardRef<HTMLLIElement, ItemProps & { className?: string }>(
  (props, ref) => {
    const { onPointerDown, onPointerUp, disabled, onPress, ...restProps } =
      props;

    const id = useId();

    const menuContext = useMenuContext(Item_Name);

    const isFocused = menuContext.focused === id;

    const pointerEvents = usePointerEvents({
      onPress: () => onPress?.(),
      onPointerDown,
      onPointerUp,
    });

    return (
      <Collection.Item disabled={!!disabled} isFocused={isFocused} id={id}>
        <li
          {...restProps}
          ref={ref}
          data-disabled={!!disabled}
          aria-disabled={disabled}
          data-focused={isFocused}
          tabIndex={isFocused ? 0 : -1}
          onPointerEnter={(e) => {
            restProps.onPointerEnter?.(e);
            if (disabled) return;
            menuContext.setFocused(id);
          }}
          {...pointerEvents}
          onKeyDown={(e) => {
            restProps.onKeyDown?.(e);

            const key = e.key;

            if (![' ', 'Tab'].includes(key)) return;
            e.preventDefault();
            onPress?.();
          }}
        />
      </Collection.Item>
    );
  },
);

ItemImp.displayName = 'webbo-ui.' + Item_Name;

export const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    children,
    onPress,
    disableCloseOnPress,
    classNames,
    className,
    disabled,
    icon,
    ...restProps
  } = props;

  const rootContext = useRootContext(Item_Name);
  const stylesContext = useStylesContext(Item_Name);

  return (
    <ItemImp
      {...restProps}
      ref={ref}
      role="menuitem"
      className={stylesContext.item({
        className: classNames?.item ?? className,
      })}
      disabled={disabled}
      onPress={() => {
        if (!disableCloseOnPress) rootContext.handleClose();
        onPress?.();
      }}
    >
      {!!icon && (
        <span
          className={stylesContext.itemIcon({
            className: classNames?.itemIcon,
          })}
        >
          {icon}
        </span>
      )}

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

// *-*-*-*-* Group *-*-*-*-*

const Group_Name = 'Menu.Group';

export interface GroupProps extends React.HTMLAttributes<HTMLUListElement> {
  label: React.ReactNode;
  classNames?: {
    label?: string;
    group?: string;
  };
}

export const Group = forwardRef<HTMLUListElement, GroupProps>((props, ref) => {
  const { className, classNames, label, ...restProps } = props;

  const stylesContext = useStylesContext(Group_Name);

  return (
    <li role="none">
      <div
        role="presentation"
        className={stylesContext.label({ className: classNames?.label })}
      >
        {label}
      </div>

      <ul
        {...restProps}
        ref={ref}
        role="group"
        className={stylesContext.group({
          className: classNames?.group ?? className,
        })}
      />
    </li>
  );
});

Group.displayName = 'webbo-ui.' + Group_Name;

// *-*-*-*-* Separator *-*-*-*-*

const Separator_Name = 'Menu.Separator';

export interface SeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const stylesContext = useStylesContext(Separator_Name);

    return (
      <div
        {...restProps}
        ref={ref}
        role="separator"
        className={stylesContext.separator({ className })}
      />
    );
  },
);

Separator.displayName = 'webbo-ui.' + Separator_Name;

// *-*-*-*-* CheckboxItem *-*-*-*-*

const CheckboxItem_Name = 'Menu.CheckboxItem';

export interface CheckboxItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onChange'> {
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  disableCloseOnChange?: boolean;
  icon?: React.ReactNode;
}

const checkbox_icon = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 11.917 9.724 16.5 19 7.5"
      />
    </svg>
  </Icon>
);

export const CheckboxItem = forwardRef<HTMLLIElement, CheckboxItemProps>(
  (props, ref) => {
    const {
      children,
      classNames,
      className,
      checked,
      onChange,
      disabled,
      icon = checkbox_icon,
      disableCloseOnChange,
      ...restProps
    } = props;

    const stylesContext = useStylesContext(CheckboxItem_Name);
    const rootContext = useRootContext(CheckboxItem_Name);

    return (
      <ItemImp
        {...restProps}
        ref={ref}
        role="menuitemcheckbox"
        data-checked={checked}
        aria-checked={checked}
        className={stylesContext.item({
          className: classNames?.item ?? className,
        })}
        disabled={disabled}
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

export interface RadioGroupProps extends Omit<GroupProps, 'onChange'> {
  onChange?: (value: string) => void;
  value?: string;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { onChange: onChangeProp, value, ...restProps } = props;

  const onChange = useCallbackRef(onChangeProp);

  return (
    <RadioGroupProvider onChange={onChange} value={value}>
      <Group {...restProps} />
    </RadioGroupProvider>
  );
};

RadioGroup.displayName = 'webbo-ui.' + RadioGroup_Name;

// *-*-*-*-* RadioItem *-*-*-*-*

const RadioItem_Name = 'Menu.RadioItem';

export interface RadioItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
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
  <Icon>
    <svg fill="none" viewBox="0 0 48 48">
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
  </Icon>
);

export const RadioItem = forwardRef<HTMLLIElement, RadioItemProps>(
  (props, ref) => {
    const {
      children,
      disabled,
      classNames,
      className,
      value,
      icon = radio_icon,
      disableCloseOnChange,
      ...restProps
    } = props;

    const stylesContext = useStylesContext(RadioItem_Name);
    const rootContext = useRootContext(CheckboxItem_Name);
    const groupContext = useRadioGroupContext(RadioItem_Name);

    const checked = value === groupContext.value;

    return (
      <ItemImp
        {...restProps}
        ref={ref}
        role="menuitemradio"
        data-checked={checked}
        aria-checked={checked}
        className={stylesContext.item({
          className: classNames?.item ?? className,
        })}
        disabled={disabled}
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
