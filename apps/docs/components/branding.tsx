import Link from 'next/link';
import React from 'react';

export interface BrandingProps {
  className?: string;
}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const {} = props;

  return (
    <Link
      href="/"
      aria-label="home page"
      className="inline-block select-none text-xl font-medium leading-none text-muted-12 first-letter:uppercase"
    >
      typeweave
    </Link>
  );
};

Branding.displayName = displayName;
