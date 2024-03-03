import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { CodeBlock } from './code-block';
import { CodePreview } from './code-preview';
import { CodeSource } from './code-source';
import { Highlight } from './highlight';
import { Gap } from './gap';
import { Steps } from './steps';
import * as demos from './demos';
import Link from 'next/link';

export const mdxComponents: MDXRemoteProps['components'] = {
  ...demos,
  Steps,
  Gap,
  CodePreview,
  CodeSource,
  DocHeader,
  Highlight,
  h2: (props) => <HeadingLink as="h2" {...props} />,
  h3: (props) => <HeadingLink as="h3" {...props} />,
  code: (props) => <CodeBlock {...props} />,
  p: (props) => <p {...props} className="mt-4" />,
  pre: (props) => <pre {...props} className={`${props.className} relative`} />,
  ul: (props) => <ul {...props} className="list-disc list-inside" />,
  a: (props) => (
    // @ts-ignore
    <Link
      {...props}
      className="underline italic text-secondary-11 dark:text-secondaryDark-11 underline-offset-2"
    />
  ),
};
