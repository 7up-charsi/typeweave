import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from './mdx-components';
import { addLangToPre } from '@/lib/add-lang-to-pre';

interface Props {
  source: string;
}

export const RenderMarkdown = ({ source }: Props) => {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeSlug, addLangToPre],
        },
      }}
    />
  );
};
