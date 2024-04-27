import React from 'react';
import { PopperCtxProps, usePopperCtx } from './popper-root';
import { Slot } from '../slot';

export interface PopperReferenceProps {
  children?:
    | React.ReactNode
    | ((props: {
        referenceRef: PopperCtxProps['setReference'];
      }) => React.ReactNode);
  virtual?: boolean;
  /**
   * @see {@link https://floating-ui.com/docs/virtual-elements virtual-elements}
   */
  virtualElement?: HTMLElement | null;
}

const Comp_Name = 'PopperReference';

export const PopperReference = (props: PopperReferenceProps) => {
  const { children, virtual, virtualElement } = props;

  const popperCtx = usePopperCtx(Comp_Name);

  const setReference = popperCtx.setReference;

  React.useEffect(() => {
    if (virtualElement) setReference(virtualElement);

    //
  }, [setReference, virtualElement]);

  if (virtual) return null;

  return typeof children === 'function' ? (
    children({ referenceRef: popperCtx.setReference })
  ) : (
    <Slot ref={popperCtx.setReference}>{children}</Slot>
  );
};

PopperReference.displayName = 'PopperReference';
