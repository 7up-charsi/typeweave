// *-*-*-*-* ApiLink *-*-*-*-*

import Link from 'next/link';
import { Highlight } from './highlight';

export interface ApiLinkProps {
  href?: string;
}

export const ApiLink = (props: ApiLinkProps) => {
  const { href } = props;

  return (
    <p>
      All <Highlight>Props</Highlight> of this component with their{' '}
      <code>Type</code>, <code>Default</code> and <code>Description</code> are
      listed <Link href={href ?? ''}>here</Link>.
    </p>
  );
};

ApiLink.displayName = 'ApiLink';
