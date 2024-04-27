import React from 'react';
import { createContextScope } from '../context';

export interface PopperRootProps {
  children?: React.ReactNode;
}

export interface PopperCtxProps {
  reference: HTMLElement | null;
  setReference: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const displayName = 'PopperRoot';

const [PopperCtx, usePopperCtx] =
  createContextScope<PopperCtxProps>(displayName);

export { usePopperCtx };

export const PopperRoot = (props: PopperRootProps) => {
  const { children } = props;

  const [reference, setReference] = React.useState<HTMLElement | null>(null);

  return (
    <PopperCtx reference={reference} setReference={setReference}>
      {children}
    </PopperCtx>
  );
};

PopperRoot.displayName = displayName;
