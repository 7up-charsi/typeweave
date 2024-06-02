import Link from 'next/link';
import * as demos from '../demos';
import { Demo } from './demo';
import { HeaderLinks } from './header-links';
import { Heading } from './heading';
import { Installation } from './installation';
import { Props } from './props';
import { Steps } from './steps';

export const mdxComponents: any = {
  ...demos,
  Props,
  Demo,
  Installation,
  Steps,
  HeaderLinks,
  Link,
  code: (props: any) => <code {...props} className="not-prose" />,
  pre: (props: any) => <pre {...props} className="not-prose" />,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
};
