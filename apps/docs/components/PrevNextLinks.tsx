import { NavigationLink } from '@/lib/types';
import Link from 'next/link';

interface Props {
  activeSlug?: string;
  links: NavigationLink[];
}

const PrevNextLinks = ({ activeSlug, links }: Props) => {
  if (links.length === 1) return null;

  const activeIndex = links.findIndex((link) => activeSlug === link.href);

  const prev = activeIndex > 0 ? links[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex !== links.length - 1
      ? links[activeIndex + 1]
      : null;

  return (
    <div className="flex">
      {prev && (
        <div>
          <Link href={prev?.href}>{prev?.title}</Link>
        </div>
      )}

      <div className="grow"></div>

      {next && (
        <div>
          <Link href={next?.href}>{next?.title}</Link>
        </div>
      )}
    </div>
  );
};

export default PrevNextLinks;
