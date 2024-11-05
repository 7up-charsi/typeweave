import { createContextScope } from '../context';
import { useControlled } from '../use-controlled';
import React from 'react';
import { createCollection } from '../use-collection';
import { accordionStyles } from './accordion.styles';

export type AccordionRootProps<Type, IsSingleCollapsible> = {
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement> &
  (Type extends 'multiple'
    ? {
        type?: Type;
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
        isSingleCollapsible?: undefined;
      }
    : IsSingleCollapsible extends true
      ? {
          type: Type;
          value?: string | null;
          defaultValue?: string | null;
          onValueChange?: (value: string | null) => void;
          isSingleCollapsible?: IsSingleCollapsible;
        }
      : {
          type: Type;
          value?: string;
          defaultValue?: string;
          onValueChange?: (value: string) => void;
          isSingleCollapsible: IsSingleCollapsible;
        });

interface AccordionCtxProps {
  onExpand: (value: string) => void;
  onCollapse: (value: string) => void;
  disabled?: boolean;
  value: string | string[] | null;
  type: 'multiple' | 'single';
}

const displayName = 'AccordionRoot';

const [AccordionCtx, useAccordionCtx] =
  createContextScope<AccordionCtxProps>(displayName);

const [AccordionStyles, useAccordionStyles] =
  createContextScope<ReturnType<typeof accordionStyles>>(displayName);

export { useAccordionCtx, useAccordionStyles };

export const [AccordionCollection, useAccordionCollection] = createCollection<
  HTMLButtonElement,
  object
>(displayName);

export const AccordionRootImpl = React.forwardRef<
  HTMLDivElement,
  AccordionRootProps<'multiple' | 'single', true>
>((props, ref) => {
  const {
    value: valueProp,
    onValueChange,
    defaultValue,
    disabled,
    className,
    isSingleCollapsible = true,
    type = 'multiple',
    ...restProps
  } = props;

  const [value, setValue] = useControlled({
    default:
      type === 'multiple'
        ? ((defaultValue as string[]) ?? [])
        : (defaultValue as string | null),
    controlled: valueProp,
    name: displayName,
    state: 'value',
    onChange: (newValue) => onValueChange?.(newValue as never),
  });

  const onExpand = (expanedItem: string) => {
    if (disabled) return;

    if (type === 'single') {
      setValue(expanedItem);
      return;
    }

    if (type === 'multiple') {
      setValue((prev) => (Array.isArray(prev) ? [...prev, expanedItem] : prev));
      return;
    }
  };

  const onCollapse = (collapsedItem: string) => {
    if (disabled) return;

    if (type === 'single' && !isSingleCollapsible) return;

    if (type === 'single' && isSingleCollapsible) {
      setValue(null);
      return;
    }

    if (type === 'multiple') {
      setValue((prev) =>
        Array.isArray(prev)
          ? prev.filter((ele) => ele !== collapsedItem)
          : prev,
      );
      return;
    }
  };

  const styles = React.useMemo(() => accordionStyles(), []);

  if (
    valueProp &&
    type === 'single' &&
    !isSingleCollapsible &&
    Array.isArray(value)
  )
    throw new Error(
      `${displayName}, \`value\` must be \`string\` when type is single and isSingleCollapsible is false`,
    );

  if (
    valueProp &&
    type === 'single' &&
    isSingleCollapsible &&
    Array.isArray(value)
  )
    throw new Error(
      `${displayName}, \`value\` must be \`string | null\` when type is single and isSingleCollapsible is true`,
    );

  if (valueProp && type === 'multiple' && !Array.isArray(value))
    throw new Error(
      `${displayName}, \`value\` must be \`array\` when type is multiple`,
    );

  return (
    <AccordionCtx
      type={type}
      onCollapse={onCollapse}
      onExpand={onExpand}
      disabled={disabled}
      value={value}
    >
      <AccordionStyles {...styles}>
        <AccordionCollection.Provider>
          <AccordionCollection.Parent>
            <div
              {...restProps}
              ref={ref}
              className={styles.base({ className })}
            />
          </AccordionCollection.Parent>
        </AccordionCollection.Provider>
      </AccordionStyles>
    </AccordionCtx>
  );
});

AccordionRootImpl.displayName = displayName;

export const AccordionRoot = AccordionRootImpl as unknown as <
  Type extends 'single' | 'multiple' = 'multiple',
  IsSingleCollapsible extends boolean = true,
>(
  props: AccordionRootProps<Type, IsSingleCollapsible> &
    React.RefAttributes<HTMLDivElement>,
) => React.ReactNode;
