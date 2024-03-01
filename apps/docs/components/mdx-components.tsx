import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { HeadingLink } from './heading-link';
import { DocHeader } from './doc-header';
import { CodeBlock } from './code-block';
import { CodePreview } from './code-preview';
import { CodeSource } from './code-source';
import { Highlight } from './highlight';
import * as demos from './demos';

export const mdxComponents: MDXRemoteProps['components'] = {
  ...demos,
  CodePreview,
  CodeSource,
  DocHeader,
  Highlight,
  h2: (props) => <HeadingLink as="h2" {...props} />,
  h3: (props) => <HeadingLink as="h3" {...props} />,
  code: (props) => <CodeBlock {...props} />,
  p: (props) => <p {...props} className="mt-4" />,
};
