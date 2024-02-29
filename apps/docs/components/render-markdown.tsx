import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from './mdx-components';
import { rehypeClasses } from '@/lib/rehype-classes';

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
          rehypePlugins: [rehypeSlug, rehypeClasses],
        },
      }}
    />
  );
};
