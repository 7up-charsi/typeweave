import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { DocHeaderLinks } from './doc-header-links';
import { Separator } from './separator';
import { CodeDemo } from './code-demo';
import { Highlight } from './highlight';
import { Gap } from './gap';
import { Steps } from './steps';
import * as demos from './demos';
import Link from 'next/link';
import { Code } from './code';
import { Pre } from './pre';
import { StylePaths } from './style-paths';
import { Installation } from './installation';

export const mdxComponents: any = {
  ...demos,
  CodeDemo,
  Installation,
  StylePaths,
  Steps,
  Gap,
  DocHeader,
  DocHeaderLinks,
  Separator,
  Highlight,
  code: Code,
  pre: Pre,
  h2: (props: any) => <HeadingLink as="h2" {...props} />,
  h3: (props: any) => <HeadingLink as="h3" {...props} />,
  p: (props: any) => <p {...props} className="mt-4" />,
  ul: (props: any) => <ul {...props} className="list-disc list-inside" />,
  a: (props: any) => (
    // @ts-ignore
    <Link
      {...props}
      className="underline italic text-secondary-11 underline-offset-2"
    />
  ),
};
