import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { HeadingLink } from './heading-link';
import { CodeBlock } from './code-block';

export const mdxComponents: MDXRemoteProps['components'] = {
  h2: (props) => <HeadingLink as="h2" {...props} />,
  h3: (props) => <HeadingLink as="h3" {...props} />,
  code: (props) => <CodeBlock {...props} />,
};
