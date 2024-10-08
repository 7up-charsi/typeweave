import { Button } from '@typeweave/react/button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const displayName = 'GithubLink';

export const GithubLink = () => {
  return (
    <Button
      variant="text"
      asChild
      isIconOnly
      aria-label="github source code"
    >
      <Link
        href="https://github.com/7up-charsi/typeweave"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon />
      </Link>
    </Button>
  );
};

GithubLink.displayName = displayName;
