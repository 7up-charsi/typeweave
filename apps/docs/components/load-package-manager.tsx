'use client';

import { usePackageManagerState } from '@/hooks/use-package-manager-state';
import React from 'react';

const displayName = 'LoadPackageManager';

export const LoadPackageManager = () => {
  const onChange = usePackageManagerState((s) => s.onChange);

  React.useEffect(() => {
    const ele = localStorage.getItem('package-manager');

    if (ele) onChange(ele as never);
    else onChange('pnpm');
  }, [onChange]);

  return null;
};

LoadPackageManager.displayName = displayName;
