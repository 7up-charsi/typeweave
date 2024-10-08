import Link from 'next/link';
import React from 'react';

const displayName = 'Branding';

export const Branding = () => {
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
