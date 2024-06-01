'use client';

import Link from 'next/link';
import React from 'react';

export const Toc = () => {
  const [headings, setHeadings] = React.useState<
    HTMLHeadingElement[] | null
  >(null);

  const [activeId, setActiveId] = React.useState<string | null>();

  React.useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('[data-mdx-heading]'),
    );

    if (!headingElements.length) return;

    setHeadings(headingElements);

    const elements = headingElements.map((heading) =>
      document.querySelector(`[id="${heading.id}"]`),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) {
            setActiveId(entry.target.getAttribute('id'));
          }
        });
      },
      {
        rootMargin: '0% 0% -80% 0%',
      },
    );

    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!headings) return;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-theme(spacing.16))] w-[200px] shrink-0 p-2 pt-4 lg:block">
      <span className="text-sm text-muted-11">Table of contents</span>
      <nav aria-label="table of content" className="flex flex-col">
        {headings.map(({ id, innerText, dataset }, i) => {
          const depth = dataset.depth as unknown as string;

          return (
            <div key={i} className="flex h-8 items-center gap-2">
              <div
                style={{ marginLeft: +depth === 2 ? 0 : +depth * 5 }}
                className={`h-1/3 w-1 rounded-full ${activeId === id ? 'bg-primary-9' : 'bg-transparent'}`}
              ></div>
              <Link
                href={`#${id}`}
                className={`text-sm ${
                  activeId === id
                    ? 'text-primary-11 hover:text-primary-12'
                    : 'text-muted-11 hover:text-muted-12'
                }`}
              >
                <span className="inline-block first-letter:uppercase ">
                  {innerText}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
