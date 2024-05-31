'use client';

import { customizationLinks } from '@/config/customization-links';
import { guidesLinks } from '@/config/guides-links';
import { componentsLinks } from '@/config/components-links';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarGroup } from './sidebar-group';

const linkStyles = (href: string, pathname: string) =>
  `flex h-8 items-center rounded px-3 ${pathname === href ? 'bg-primary-4 text-primary-11' : 'text-muted-11 hover:bg-muted-3'} focus-visible:ring-2 focus-visible:ring-focus`;

export const SidebarContent = () => {
  const pathname = usePathname();

  return (
    <nav className="isolate space-y-1 [&_ul>li]:space-y-1 [&_ul]:space-y-1 [&_ul]:pl-3">
      <SidebarGroup heading="guides">
        {guidesLinks.map(({ title, href }, i) => (
          <li key={i}>
            <Link href={href} className={linkStyles(href, pathname)}>
              <span className="first-letter:uppercase">{title}</span>
            </Link>
          </li>
        ))}
      </SidebarGroup>

      <SidebarGroup heading="customization">
        {customizationLinks.map(({ title, href }, i) => (
          <li key={i}>
            <Link href={href} className={linkStyles(href, pathname)}>
              <span className="first-letter:uppercase">{title}</span>
            </Link>
          </li>
        ))}
      </SidebarGroup>

      <SidebarGroup heading="components">
        {Object.entries(componentsLinks).map(
          ([heading, links], i) => {
            const id = `components-group-${i + 1}`;

            return (
              <li
                key={heading.replaceAll(' ', '-')}
                className="relative !my-5 border-l-2 border-l-muted-6 before:absolute before:-left-[1px] before:top-0 before:h-2 before:w-2 before:-translate-x-[calc(100%/2)] before:rounded-full before:bg-muted-6 after:absolute after:-left-[1px] after:bottom-0 after:h-2 after:w-2 after:-translate-x-[calc(100%/2)] after:rounded-full after:bg-muted-6 first:!mt-0 last:!mb-0"
              >
                <h2
                  id={id}
                  className="block pl-3 text-sm font-medium first-letter:uppercase"
                >
                  {heading.replace(/([A-Z])/g, ' $1')}
                </h2>

                <ul aria-labelledby={id}>
                  {links.sort().map(({ title, href }, i) => (
                    <li key={i}>
                      <Link
                        href={href}
                        className={linkStyles(href, pathname)}
                      >
                        <span className="first-letter:uppercase">
                          {title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          },
        )}
      </SidebarGroup>
    </nav>
  );
};
