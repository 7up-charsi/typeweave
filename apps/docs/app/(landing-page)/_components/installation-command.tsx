'use client';

import { PointerEvents, Slot } from '@typeweave/react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Fira_Code } from 'next/font/google';
import React from 'react';

const font_code = Fira_Code({
  variable: '--font-code',
  subsets: ['latin'],
});

const displayName = 'InstallationCommand';

export const InstallationCommand = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <PointerEvents
      onPress={() => {
        navigator.clipboard.writeText(
          'npm install @typeweave/react @typeweave/plugin',
        );
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }}
    >
      <div className="group relative cursor-copy text-sm">
        <code className={font_code.className}>
          <span className="select-none">$ </span>npm install
          @typeweave/react @typeweave/plugin
        </code>

        {isCopied ? (
          <CheckIcon
            size={16}
            className="absolute -right-6 top-1/2 hidden -translate-y-1/2 group-hover:inline-block"
          />
        ) : (
          <CopyIcon
            size={16}
            className="absolute -right-6 top-1/2 hidden -translate-y-1/2 group-hover:inline-block"
          />
        )}
      </div>
    </PointerEvents>
  );
};

InstallationCommand.displayName = displayName;
