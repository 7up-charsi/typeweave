'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import { Skeleton } from '@typeweave/react/skeleton';
import Link from 'next/link';
import React from 'react';

export const Toc = () => {
  const [headings, setHeadings] = React.useState<
    HTMLHeadingElement[]
  >([]);

  const [activeHeadings, setActiveHeadings] = React.useState<
    string[]
  >([]);

  const dirYRef = React.useRef(0);

  const [{ dirY }] = useScroll();

  React.useEffect(() => {
    dirYRef.current = dirY;
  }, [dirY]);

  React.useEffect(() => {
    const headings = document.querySelectorAll(
      '[data-mdx-heading]',
    ) as unknown as HTMLHeadingElement[];

    if (!headings.length) return;

    setHeadings(Array.from(headings));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setActiveHeadings((prev) =>
              [...prev, entry.target.id].sort(),
            );
          }

          if (entry.intersectionRatio === 0) {
            setActiveHeadings((prev) =>
              prev.filter((id) => id !== entry.target.id),
            );
          }
        });
      },
      {
        rootMargin: '-65px 0px 0px 0px',
        threshold: [1, 0],
      },
    );

    headings.forEach((ele) => observer.observe(ele));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <aside className="sticky top-[65px] hidden h-[var(--screen-height)] w-full p-2 pt-4 lg:block">
      <span className="text-sm text-muted-11">Table of contents</span>
      <nav aria-label="table of content" className="flex flex-col">
        {headings ? null : (
          <div className="space-y-2 pr-5 text-sm">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="ml-5 w-auto" />
            <Skeleton variant="text" className="ml-5 w-auto" />
            <Skeleton variant="text" className="ml-5 w-auto" />
            <Skeleton variant="text" className="ml-5 w-auto" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        )}

        {headings && !headings.length ? (
          <span className="mt-10 text-sm text-muted-11/70">
            No headings found
          </span>
        ) : null}

        {!headings?.length
          ? null
          : headings.map(({ id, innerText, dataset }, i) => {
              const depth = dataset.depth as unknown as string;

              return (
                <div
                  data-active={activeHeadings.includes(id)}
                  key={i}
                  className="group flex h-8 items-center gap-2"
                >
                  <div
                    style={{
                      marginLeft: +depth === 2 ? 0 : +depth * 5,
                    }}
                    className="h-1/3 w-1 rounded-full bg-transparent group-data-[active=true]:bg-primary-9"
                  ></div>

                  <Link
                    href={`#${id}`}
                    className="text-sm text-muted-11 hover:text-muted-12"
                  >
                    <span className="inline-block first-letter:uppercase">
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
