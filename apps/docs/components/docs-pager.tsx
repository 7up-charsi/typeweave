import { componentsLinks } from '@/config/components-links';
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

  const links = activeSlug.startsWith('components/')
    ? componentsLinks
    : guidesLinks;

  const activeIndex = links.findIndex(
    (link) => `/docs/${activeSlug}` === link.href,
  );

  const prev = activeIndex > 0 ? links[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex !== links.length - 1
      ? links[activeIndex + 1]
      : null;

  return (
    <div className="flex mt-10">
      {prev && (
        <Button variant="flat" color="primary" asChild startContent={arrowLeft}>
          <Link href={prev?.href}>{prev?.title}</Link>
        </Button>
      )}

      <div className="grow"></div>

      {next && (
        <Button variant="flat" color="primary" asChild endContent={arrowRight}>
          <Link href={next?.href}>{next?.title}</Link>
        </Button>
      )}
    </div>
  );
};
