import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from '@/mdx-components';
import { visit } from 'unist-util-visit';

interface Props {
  source: string;
}

export const RenderMarkdown = ({ source }: Props) => {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            () => (tree) => {
              visit(tree, 'element', (node) => {
                if (node.tagName === 'code' && node.data && node.data.meta) {
                  node.properties.meta = node.data.meta;
                }
              });
            },
          ],
        },
      }}
    />
  );
};
