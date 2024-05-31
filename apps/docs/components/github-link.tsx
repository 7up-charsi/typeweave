import { Button } from '@typeweave/react';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface GithubLinkProps {
  className?: string;
}

const displayName = 'GithubLink';

export const GithubLink = (props: GithubLinkProps) => {
  const { className } = props;

  return (
    <Button
      asChild
      isIconOnly
      aria-label="github source code"
      className={className}
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
