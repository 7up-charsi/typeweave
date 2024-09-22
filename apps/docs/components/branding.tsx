import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import React from 'react';

export interface BrandingProps {
  className?: string;
}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const { className } = props;

  return (
    <Link
      href="/"
      aria-label="home page"
      className={twMerge(
        'inline-block select-none text-xl font-medium leading-none text-primary-11 first-letter:uppercase',
        className,
      )}
    >
      typeweave
    </Link>
  );
};

Branding.displayName = displayName;
