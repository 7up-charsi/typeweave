import { mdxComponents } from '@/mdx-components';
import remarkDirective from 'remark-directive';
import { evaluate } from '@mdx-js/mdx';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import React from 'react';

// @ts-ignore
import { remarkAdmonitions } from '@/lib/remark-admonitions';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

interface CompileMdxProps {
  content: string;
}

const displayName = 'CompileMdx';

export const CompileMdx = async (props: CompileMdxProps) => {
  const { content } = props;

  const { default: MdxContent } = await evaluate(content, {
    format: 'mdx',
    Fragment,
    // @ts-ignore
    jsx,
    // @ts-ignore
    jsxs,
    remarkPlugins: [remarkGfm, remarkDirective, remarkAdmonitions],
    rehypePlugins: [rehypeSlug],
  });

  return <MdxContent components={mdxComponents} />;
};

CompileMdx.displayName = displayName;
