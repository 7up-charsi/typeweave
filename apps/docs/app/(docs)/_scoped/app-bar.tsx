'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface AppBarProps {
  children?: React.ReactNode;
}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const { children } = props;

  const isHideRef = React.useRef(false);

  const [{ scrollY, deltaY, dirY, isAtTop }] = useScroll();

  if (scrollY > 400 && deltaY > 100 && dirY === 1) {
    isHideRef.current = true;
  } else if (deltaY > 100 && dirY === -1) {
    isHideRef.current = false;
  }

  return (
    <div
      data-hide={isHideRef.current}
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="sticky top-0 z-50 border-b border-muted-6 bg-background transition-transform max-lg:data-[hide=true]:-translate-y-full max-lg:data-[hide=false]:data-[scrolled=true]:shadow-md lg:bg-background/50 lg:backdrop-blur-sm"
    >
      {children}
    </div>
  );
};

AppBar.displayName = displayName;
