import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { DocHeaderLinks } from './doc-header-links';
import { Separator } from './separator';
import { Demo } from './demo';
import { Steps } from './steps';
import { Installation } from './installation';
import { Props } from './props';
import * as demos from './demos';
import { Link } from './Link';

export const mdxComponents: any = {
  ...demos,
  Props,
  Demo,
  Installation,
  Steps,
  DocHeader,
  DocHeaderLinks,
  Separator,
  h2: (props: any) => <HeadingLink as="h2" {...props} />,
  h3: (props: any) => <HeadingLink as="h3" {...props} />,
  p: (props: any) => <p {...props} className="mt-4" />,
  ul: (props: any) => (
    <ul {...props} className="list-inside list-disc" />
  ),
  a: Link,
};
