import React from 'react';
import { useItemContext } from './item';
import { useStylesContext } from './root';
import { Slot } from '@webbo-ui/slot';

export interface AccordionHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const Comp_Name = 'AccordionHeader';

export const AccordionHeader = React.forwardRef<
  HTMLHeadingElement,
  AccordionHeaderProps
>((props, ref) => {
  const { asChild, className, ...restProps } = props;

  const itemContext = useItemContext(Comp_Name);

  const styles = useStylesContext(Comp_Name);

  const Comp = asChild ? Slot : 'h3';

  return (
    <Comp
      {...restProps}
      ref={ref}
      className={styles.header({ className })}
      data-expanded={itemContext.isExpended}
    />
  );
});

AccordionHeader.displayName = 'AccordionHeader';
