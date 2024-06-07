import { createContextScope } from '../context';
import React from 'react';
import { Slot } from '../slot';
import { useControlled } from '../use-controlled';
import { disclosureStyles } from './disclosure-styles';

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
  createContextScope<ReturnType<typeof disclosureStyles>>(displayName);

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

  const [value, setValue] = useControlled({
    default: defaultValue ?? [],
    controlled: valueProp,
    name: displayName,
    state: 'value',
    onChange: onValueChange,
  });

  const onExpand = (expandedItem: string) => {
    if (disabled) return;

    setValue((prev) => [...prev, expandedItem]);
  };

  const onCollapse = (collapsedItem: string) => {
    if (disabled) return;

    setValue((prev) => prev.filter((ele) => ele !== collapsedItem));
  };

  const styles = React.useMemo(() => disclosureStyles(), []);

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
