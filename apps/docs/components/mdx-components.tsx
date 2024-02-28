import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { CodeBlock } from './code-block';
import { Highlight } from './highlight';
import { CodeDemo } from './code-demo';

export const mdxComponents: MDXRemoteProps['components'] = {
  CodeDemo,
  DocHeader,
  Highlight,
  h2: (props) => <HeadingLink as="h2" {...props} />,
  h3: (props) => <HeadingLink as="h3" {...props} />,
  code: (props) => <CodeBlock {...props} />,
  pre: (props) => (
    <pre {...props} className="p-4 rounded bg-muted-3 dark:bg-mutedDark-3" />
  ),
};
