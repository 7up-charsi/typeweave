import React from 'react';
import { createContextScope } from '../context';
import { useAccordionCtx, useAccordionStyles } from './accordion-root';

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

interface AccordionItemCtxProps {
  value: string;
  triggerId: string;
  contentId: string;
  isExpended: boolean;
  disabled?: boolean;
}

const displayName = 'AccordionItem';

const [AccordionItemCtx, useAccordionItemCtx] =
  createContextScope<AccordionItemCtxProps>(displayName);

export { useAccordionItemCtx };

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>((props, ref) => {
  const { value, className, disabled, ...restProps } = props;

  const accordionCtx = useAccordionCtx(displayName);
  const styles = useAccordionStyles(displayName);

  const triggerId = React.useId();
  const contentId = React.useId();

  const isExpended =
    accordionCtx.type === 'multiple'
      ? Array.isArray(accordionCtx.value) &&
        !!accordionCtx.value.find((ele) => ele === value)
      : accordionCtx.value === value;

  return (
    <AccordionItemCtx
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
    </AccordionItemCtx>
  );
});

AccordionItem.displayName = displayName;
