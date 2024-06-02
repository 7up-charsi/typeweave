import Link from 'next/link';
import * as demos from '../demos';
import { Demo } from './demo';
import { HeaderLinks } from './header-links';
import { Heading } from './heading';
import { Installation } from './installation';
import { Props } from './props';
import { Steps } from './steps';
import { Code } from './code';
import { Pre } from './pre';
import { ClientDemoRenderer } from './client-demo-renderer';

export const mdxComponents: any = {
  ...demos,
  Props,
  Demo,
  ClientDemoRenderer,
  Installation,
  Steps,
  HeaderLinks,
  Link,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
  code: Code,
  pre: Pre,
};
