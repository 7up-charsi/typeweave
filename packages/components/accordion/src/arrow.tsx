import React from 'react';
import { useStylesContext } from './root';
import { Icon } from '@webbo-ui/icon';

export interface AccordionArrowProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {}

const Comp_Name = 'AccordionArrow';

export const AccordionArrow = React.forwardRef<
  SVGSVGElement,
  AccordionArrowProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const styles = useStylesContext(Comp_Name);

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

AccordionArrow.displayName = 'AccordionArrow';
