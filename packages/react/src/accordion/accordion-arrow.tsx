import React from 'react';
import { useAccordionStyles } from './accordion-root';
import { ChevronDown } from 'lucide-react';

export interface AccordionArrowProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {}

const displayName = 'AccordionArrow';

export const AccordionArrow = React.forwardRef<
  SVGSVGElement,
  AccordionArrowProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const styles = useAccordionStyles(displayName);

  return (
    <ChevronDown
      {...restProps}
      ref={ref}
      className={styles.arrow({ className })}
    ></ChevronDown>
  );
});

AccordionArrow.displayName = displayName;
