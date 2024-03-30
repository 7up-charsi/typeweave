import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { DocHeaderLinks } from './doc-header-links';
import { Separator } from './separator';
import { Demo } from './demo';
import { Gap } from './gap';
import { Steps } from './steps';
import Link from 'next/link';
import { Code } from './code';
import { StylePaths } from './style-paths';
import { Installation } from './installation';
import { Props } from './props';
import { Anatomy } from './anatomy';
import { Prop } from './prop';
import { Highlight } from './highlight';
import { TsType } from './ts-type';
import * as demos from './demos';

export const mdxComponents: any = {
  ...demos,
  Prop,
  TsType,
  Anatomy,
  Highlight,
  Props,
  Demo,
  Installation,
  StylePaths,
  Steps,
  Gap,
  DocHeader,
  DocHeaderLinks,
  Separator,
  code: Code,
  h2: (props: any) => <HeadingLink as="h2" {...props} />,
  h3: (props: any) => <HeadingLink as="h3" {...props} />,
  p: (props: any) => <p {...props} className="mt-4" />,
  ul: (props: any) => <ul {...props} className="list-inside list-disc" />,
  a: (props: any) => {
    const className = 'text-info-11 underline underline-offset-2';
    return props.href?.startsWith('#') ? (
      <a {...props} className={className} />
    ) : (
      // @ts-ignore
      <Link {...props} className={className} />
    );
  },
};
