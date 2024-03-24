'use client';

import React from 'react';
import * as Alert from '@webbo-ui/alert';
import * as Button from '@webbo-ui/button';
import * as Icon from '@webbo-ui/icon';
import { Runner } from 'react-runner';

export interface ReactRunnerProps {
  code?: React.ReactNode;
}

export const ReactRunner = (props: ReactRunnerProps) => {
  const { code } = props;

  return (
    <Runner
      code={code}
      scope={{
        ...React,
        import: {
          react: React,
          '@webbo-ui/alert': Alert,
          '@webbo-ui/button': Button,
          '@webbo-ui/icon': Icon,
        },
      }}
    />
  );
};

ReactRunner.displayName = 'ReactRunner';
