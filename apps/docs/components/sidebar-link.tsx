'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  title: string;
}

export const SidebarLink = ({ href, title }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`inline-flex h-8 items-center rounded px-3 ${pathname === href ? 'bg-primary-4 text-primary-11' : 'text-muted-11 hover:bg-muted-3'}`}
    >
      <span className="first-letter:uppercase">{title}</span>
    </Link>
  );
};
