import {
  componentsLinks,
  gettingStartedLinks,
} from '@/constants/links';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import Link from 'next/link';

interface PagerProps {
  activeHref?: string;
}

export const Pager = ({ activeHref }: PagerProps) => {
  if (!activeHref) return null;

  const links = [
    ...gettingStartedLinks,
    ...Object.values(componentsLinks)
      .map((arr) => arr.sort())
      .flat(),
  ];

  const activeIndex = links.findIndex(
    (link) => `/${activeHref}` === link.href,
  );

  const prev = activeIndex > 0 ? links[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex !== links.length - 1
      ? links[activeIndex + 1]
      : null;

  return (
    <>
      <hr className="mb-5 mt-5 border-muted-6" />

      <div className="not-prose mb-1 flex">
        {prev && (
          <Button
            asChild
            startContent={<ChevronLeft />}
            aria-label={`got to prev docs ${prev.title} page`}
            variant="text"
          >
            <Link href={prev.href} className="first-letter:uppercase">
              {prev.title}
            </Link>
          </Button>
        )}

        <div className="grow"></div>

        {next && (
          <Button
            asChild
            endContent={<ChevronRight />}
            aria-label={`got to next docs ${next.title} page`}
            variant="text"
          >
            <Link href={next.href} className="first-letter:uppercase">
              {next.title}
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};
