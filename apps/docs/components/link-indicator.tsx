import { Link2Icon } from 'lucide-react';
import Link from 'next/link';

export interface LinkIndicatorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: 'next-link' | 'anchor-tag';
}

export const LinkIndicator = (props: LinkIndicatorProps) => {
  const { id, as = 'anchor-tag', ...restProps } = props;

  const Comp = as === 'next-link' ? Link : 'a';

  return (
    <Comp
      {...restProps}
      href={`#${id}`}
      className="ml-4 hidden cursor-pointer rounded bg-primary-3 px-2 py-1 text-base text-primary-11 dynamic-icon hover:bg-primary-4 active:bg-primary-5 group-hover:inline-block"
    >
      <Link2Icon />
    </Comp>
  );
};

LinkIndicator.displayName = 'LinkIndicator';
