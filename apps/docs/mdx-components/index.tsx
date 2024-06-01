import * as demos from '../demos';
import { Demo } from './demo';
import { DocHeaderLinks } from './doc-header-links';
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
  DocHeaderLinks,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
};
