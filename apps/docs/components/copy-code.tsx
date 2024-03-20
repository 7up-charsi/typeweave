'use client';

import { Button } from '@webbo-ui/button';
import { useRef, useState } from 'react';

const copy_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <g fill="currentColor">
      <path d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9z"></path>
      <path d="M17.1 2h-4.2C9.817 2 8.37 3.094 8.07 5.739c-.064.553.395 1.011.952 1.011H11.1c4.2 0 6.15 1.95 6.15 6.15v2.078c0 .557.457 1.015 1.01.952C20.907 15.63 22 14.183 22 11.1V6.9C22 3.4 20.6 2 17.1 2z"></path>
    </g>
  </svg>
);

const copied_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    width={20}
    height={20}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
    ></path>
  </svg>
);

interface Props {
  code?: string;
}

export const CopyCode = (props: Props) => {
  const { code } = props;

  const [isCopied, setIsCopied] = useState(false);
  const resetTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  if (!code) return null;

  return (
    <Button
      isIconOnly
      size="sm"
      aria-label="copy code"
      classNames={{
        base: 'absolute right-3 top-3 z-50 text-muted-8 hover:bg-muted-11 hover:text-muted-6 active:bg-muted-10',
      }}
      variant="text"
      onPress={() => {
        clearTimeout(resetTimer.current);

        navigator.clipboard.writeText(code);
        setIsCopied(true);
        resetTimer.current = setTimeout(() => {
          setIsCopied(false);
          resetTimer.current = undefined;
        }, 1000);
      }}
    >
      {isCopied ? copied_svg : copy_svg}
    </Button>
  );
};
