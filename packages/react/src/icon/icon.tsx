import React from 'react';
import { Slot } from '../slot';

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  children?: React.ReactNode;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { ...restProps } = props;

  return (
    <Slot
      {...restProps}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden={true}
      focusable={false}
    />
  );
});

Icon.displayName = 'Icon';
