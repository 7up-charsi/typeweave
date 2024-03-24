import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { DocHeaderLinks } from './doc-header-links';
import { Separator } from './separator';
import { CodeDemo } from './code-demo';
import { Highlight } from './highlight';
import { Gap } from './gap';
import { Steps } from './steps';
import Link from 'next/link';
import { Code } from './code';
import { Pre } from './pre';
import { StylePaths } from './style-paths';
import { Installation } from './installation';
import { Props } from './props';
import { Anatomy } from './anatomy';

export const mdxComponents: any = {
  Anatomy,
  Props,
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
  ul: (props: any) => <ul {...props} className="list-inside list-disc" />,
  a: (props: any) => (
    // @ts-ignore
    <Link
      {...props}
      className="italic text-secondary-11 underline underline-offset-2"
    />
  ),
};
