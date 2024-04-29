import { disclosure } from '@typeweave/theme';
import { createContextScope } from '../context';
import React from 'react';
import { Slot } from '../slot';
import { useControllableState } from '../use-controllable-state';

export interface DisclosureRootProps {
  children?: React.ReactNode;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  isSingleCollapsible?: undefined;
}

interface DisclosureCtxProps {
  onExpand: (value: string) => void;
  onCollapse: (value: string) => void;
  disabled?: boolean;
  value: string[];
}

const displayName = 'DisclosureRoot';

const [DisclosureCtx, useDisclosureCtx] =
  createContextScope<DisclosureCtxProps>(displayName);

const [DisclosureStyles, useDisclosureStyles] =
  createContextScope<ReturnType<typeof disclosure>>(displayName);

export { useDisclosureCtx, useDisclosureStyles };

export const DisclosureRoot = React.forwardRef<
  HTMLDivElement,
  DisclosureRootProps
>((props, ref) => {
  const {
    children,
    value: valueProp,
    onValueChange,
    defaultValue,
    disabled,
    asChild,
    className,
  } = props;

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue ?? [],
    value: valueProp,
    onChange: onValueChange,
  });

  const onExpand = (value: string) => {
    if (disabled) return;

    setValue((prev) => [...prev, value]);
  };

  const onCollapse = (value: string) => {
    if (disabled) return;

    setValue((prev) => prev.filter((ele) => ele !== value));
  };

  const styles = React.useMemo(() => disclosure(), []);

  const Component = asChild ? Slot : 'div';

  return (
    <DisclosureCtx
      onCollapse={onCollapse}
      onExpand={onExpand}
      disabled={disabled}
      value={value}
    >
      <DisclosureStyles {...styles}>
        <Component ref={ref} className={styles.base({ className })}>
          {children}
        </Component>
      </DisclosureStyles>
    </DisclosureCtx>
  );
});

DisclosureRoot.displayName = displayName;
