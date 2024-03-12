'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Toc = () => {
  const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);
  const [activeId, setActiveId] = useState<string | null>();

  useEffect(() => {
    // Array.from is significant because document.querySelectorAll return Array like structure
    // and it does not contain map method. we need map method to render list of headings below in
    // return statement

    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('[data-mdx-heading]'),
    );

    setHeadings(headingElements);
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings.map((heading) =>
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
  }, [headings]);

  return (
    <aside className="sticky top-16 h-[calc(100vh-theme(spacing.16))] w-full shrink-0 p-2 pt-4">
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
