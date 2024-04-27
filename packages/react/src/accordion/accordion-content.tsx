import React from 'react';
import { useAccordionStyles } from './accordion-root';
import { useAccordionItemCtx } from './accordion-item';

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'AccordionContent';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const itemCtx = useAccordionItemCtx(displayName);
  const styles = useAccordionStyles(displayName);

  return !itemCtx.isExpended ? null : (
    <div
      {...restProps}
      ref={ref}
      id={itemCtx.contentId}
      className={styles.content({ className })}
    />
  );
});

AccordionContent.displayName = displayName;
