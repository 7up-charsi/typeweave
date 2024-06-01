import React from 'react';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from './mdx-components';

// @ts-ignore
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
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });

  return <MdxContent components={mdxComponents} />;
};

CompileMdx.displayName = displayName;
