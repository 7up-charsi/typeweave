import React from 'react';
import { Slot } from '../slot';
import { useAccordionStyles } from './accordion-root';
import { useAccordionItemCtx } from './accordion-item';

export interface AccordionHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const displayName = 'AccordionHeader';

export const AccordionHeader = React.forwardRef<
  HTMLHeadingElement,
  AccordionHeaderProps
>((props, ref) => {
  const { asChild, className, ...restProps } = props;

  const itemCtx = useAccordionItemCtx(displayName);
  const styles = useAccordionStyles(displayName);

  const Comp = asChild ? Slot : 'h3';

  return (
    <Comp
      {...restProps}
      ref={ref}
      className={styles.header({ className })}
      data-expanded={itemCtx.isExpended}
    />
  );
});

AccordionHeader.displayName = displayName;
