import React from 'react';
import { Slot } from '@webbo-ui/slot';

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  children?: React.ReactNode;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
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

Icon.displayName = 'webbo-ui.Icon';

export default Icon;
