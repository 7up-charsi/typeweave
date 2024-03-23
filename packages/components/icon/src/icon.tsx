import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { CustomError } from '@webbo-ui/error';
import { mergeProps, mergeRefs } from '@webbo-ui/react-utils';

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  children?: React.ReactNode;
}

const Icon = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { children, ...restProps } = props;

  const count = Children.count(children);
  if (!count) return;
  if (count > 1) throw new CustomError('Chip', 'must have only one child');
  if (!isValidElement(children))
    throw new CustomError('Chip', 'child must be valid element');

  return cloneElement(children, {
    ...mergeProps(restProps, children.props),
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    'aria-hidden': true,
    focusable: false,
    ref: ref
      ? mergeRefs(
          ref,
          (children as unknown as { ref: React.ForwardedRef<SVGAElement> }).ref,
        )
      : (children as unknown as { ref: React.ForwardedRef<SVGAElement> }).ref,
  } as Partial<React.SVGProps<SVGAElement>>);
});

Icon.displayName = 'webbo-ui.Icon';

export default Icon;
