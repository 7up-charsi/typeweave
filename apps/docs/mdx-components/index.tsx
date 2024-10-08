import { ClientDemoRenderer } from './client-demo-renderer';
import { Installation } from './installation';
import { HeaderLinks } from './header-links';
import { FileName } from './file-name';
import { Heading } from './heading';
import * as demos from '../demos';
import { Props } from './props';
import { Steps } from './steps';
import { Demo } from './demo';
import { Code } from './code';
import Link from 'next/link';
import { Pre } from './pre';

export const mdxComponents: any = {
  ...demos,
  FileName,
  Props,
  Demo,
  ClientDemoRenderer,
  Installation,
  Steps,
  HeaderLinks,
  Link,
  code: Code,
  pre: Pre,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h3" {...props} />
  ),
  a: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    !href ? (
      'Link_Without_Href'
    ) : /^native:/.test(href) ? (
      <a {...props} href={href.slice(7)} />
    ) : (
      href && <Link {...props} href={href} />
    ),
};
