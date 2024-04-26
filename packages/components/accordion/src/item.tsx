import React from 'react';
import { useRootContext, useStylesContext } from './root';
import { createContextScope } from '@webbo-ui/context';

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

interface ItemContext {
  value: string;
  triggerId: string;
  contentId: string;
  isExpended: boolean;
  disabled?: boolean;
}

const Comp_Name = 'AccordionItem';

const [ItemProvider, useItemContext] =
  createContextScope<ItemContext>(Comp_Name);

export { useItemContext };

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>((props, ref) => {
  const { value, className, disabled, ...restProps } = props;

  const rootContext = useRootContext(Comp_Name);

  const triggerId = React.useId();
  const contentId = React.useId();

  const styles = useStylesContext(Comp_Name);

  const isExpended =
    rootContext.type === 'multiple'
      ? Array.isArray(rootContext.value) &&
        !!rootContext.value.find((ele) => ele === value)
      : rootContext.value === value;

  return (
    <ItemProvider
      value={value}
      triggerId={triggerId}
      contentId={contentId}
      isExpended={isExpended}
      disabled={disabled}
    >
      <div
        {...restProps}
        ref={ref}
        className={styles.item({ className })}
        data-expanded={isExpended}
      />
    </ItemProvider>
  );
});

AccordionItem.displayName = 'AccordionItem';
