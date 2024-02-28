import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import { mdxComponents } from './mdx-components';
import * as demosScope from './demos';

interface Props {
  source: string;
}

const rehypePrettyCodeOptions: Options = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
};

export const RenderMarkdown = ({ source }: Props) => {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        parseFrontmatter: true,
        scope: demosScope,
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            // @ts-ignore
            [rehypePrettyCode, rehypePrettyCodeOptions],
          ],
        },
      }}
    />
  );
};
