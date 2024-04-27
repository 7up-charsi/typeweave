import React from 'react';
import { Icon } from '../icon';
import { useAccordionStyles } from './accordion-root';

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
    <Icon {...restProps} ref={ref} className={styles.arrow({ className })}>
      <svg fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 9l6 6 6-6"
        ></path>
      </svg>
    </Icon>
  );
});

AccordionArrow.displayName = displayName;
