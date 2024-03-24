import { componentsApiLinks } from '@/config/components-api-links';
import { componentsLinks } from '@/config/components-links';
import { customizationLinks } from '@/config/customization-links';
import { guidesLinks } from '@/config/guides-links';
import { Button } from '@webbo-ui/button';
import Link from 'next/link';

interface Props {
  activeSlug?: string;
}

const arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <g>
      <g>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M7.6 7L2.5 12 7.6 17" data-name="Right"></path>
          <path d="M21.5 12L4.8 12"></path>
        </g>
      </g>
    </g>
  </svg>
);

const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <g>
      <g>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M16.4 7L21.5 12 16.4 17" data-name="Right"></path>
          <path d="M2.5 12L19.2 12"></path>
        </g>
      </g>
    </g>
  </svg>
);

export const DocsPager = ({ activeSlug }: Props) => {
  if (!activeSlug) return null;

  const links = [
    ...guidesLinks,
    ...customizationLinks,
    ...Object.values(componentsLinks)
      .map((arr) => arr.sort())
      .flat(),
    ...componentsApiLinks,
  ];

  const activeIndex = links.findIndex(
    (link) => `/docs/${activeSlug}` === link.href,
  );

  const prev = activeIndex > 0 ? links[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex !== links.length - 1
      ? links[activeIndex + 1]
      : null;

  const prevCategory = prev?.href.split('/')[2] ?? '';
  const nextCategory = next?.href.split('/')[2] ?? '';

  return (
    <div className="mt-10 flex">
      {prev && (
        <Button
          asChild
          startContent={arrowLeft}
          classNames={{ base: 'h-auto py-2 px-4 min-w-52 justify-start gap-4' }}
          aria-label={`got to prev docs ${prev.title} page in ${prevCategory}`}
        >
          <Link href={prev.href}>
            <div className="flex flex-col">
              <div className="text-sm text-muted-11/80 first-letter:uppercase">
                {prev.href.split('/')[2]}
              </div>
              <div className="first-letter:uppercase">{prev.title}</div>
            </div>
          </Link>
        </Button>
      )}

      <div className="grow"></div>

      {next && (
        <Button
          asChild
          endContent={arrowRight}
          classNames={{ base: 'h-auto py-2 px-4 min-w-52 justify-end gap-4' }}
          aria-label={`got to next docs ${next.title} page in ${nextCategory}`}
        >
          <Link href={next.href}>
            <div className="flex flex-col items-end">
              <div className="text-sm text-muted-11/80 first-letter:uppercase">
                {next.href.split('/')[2]}
              </div>
              <div className="first-letter:uppercase">{next.title}</div>
            </div>
          </Link>
        </Button>
      )}
    </div>
  );
};
