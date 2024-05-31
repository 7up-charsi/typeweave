import { componentsLinks } from '@/config/components-links';
import { customizationLinks } from '@/config/customization-links';
import { guidesLinks } from '@/config/guides-links';
import { Button } from '@typeweave/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DocsPagerProps {
  activeSlug?: string;
}

export const DocsPager = ({ activeSlug }: DocsPagerProps) => {
  if (!activeSlug) return null;

  const links = [
    ...guidesLinks,
    ...customizationLinks,
    ...Object.values(componentsLinks)
      .map((arr) => arr.sort())
      .flat(),
  ];

  const activeIndex = links.findIndex(
    (link) => `/docs/${activeSlug}` === link.href,
  );

  const prev = activeIndex > 0 ? links[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex !== links.length - 1
      ? links[activeIndex + 1]
      : null;

  return (
    <div className="mt-10 flex border-t border-muted-6 py-2">
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
  );
};
