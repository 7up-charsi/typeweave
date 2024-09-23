'use client';

import { useRouteProgress } from '@typeweave/react/use-route-progress';
import React from 'react';

interface RouteProgressProps {}

const displayName = 'RouteProgress';

export const RouteProgress = (props: RouteProgressProps) => {
  const {} = props;

  const { progress, hide } = useRouteProgress();

  return (
    <div
      style={{ scale: hide ? 0 : `${progress / 100} 1` }}
      className="fixed left-0 right-0 top-0 z-[999] h-1 w-full origin-left bg-black transition-transform dark:bg-white"
    ></div>
  );
};

RouteProgress.displayName = displayName;
