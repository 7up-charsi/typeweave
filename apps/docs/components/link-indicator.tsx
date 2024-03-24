// *-*-*-*-* LinkIndicator *-*-*-*-*

import { Icon } from '@webbo-ui/icon';
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
      className="ml-4 hidden cursor-pointer rounded bg-primary-3 px-2 py-1 text-base text-primary-11 hover:bg-primary-4 active:bg-primary-5 group-hover:inline-block"
    >
      <Icon>
        <svg fill="none" viewBox="0 0 24 24">
          <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
            <path d="M9 12h6M9 18H8A6 6 0 018 6h1M15 6h1a6 6 0 016 6m-7 6h1a5.973 5.973 0 003.318-1"></path>
          </g>
        </svg>
      </Icon>
    </Comp>
  );
};

LinkIndicator.displayName = 'LinkIndicator';
