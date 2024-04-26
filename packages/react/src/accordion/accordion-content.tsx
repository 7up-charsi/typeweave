import React from 'react';
import { useAccordionStyles } from './accordion-root';
import { useAccordionItemCtx } from './accordion-item';

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'AccordionContent';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const itemCtx = useAccordionItemCtx(Comp_Name);
  const styles = useAccordionStyles(Comp_Name);

  return !itemCtx.isExpended ? null : (
    <div
      {...restProps}
      ref={ref}
      id={itemCtx.contentId}
      className={styles.content({ className })}
    />
  );
});

AccordionContent.displayName = Comp_Name;
