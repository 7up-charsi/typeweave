import { notFound } from 'next/navigation';
import { readMarkdown } from '@/lib/readMarkdown';
import grayMatter from 'gray-matter';
import { PageHeader } from '@/components/PageHeader';
import PrevNextLinks from '@/components/PrevNextLinks';
import { componentsLinks } from '@/config/componentsLinks';
import { getHeadings } from '@/lib/utils';
import Toc from '@/components/Toc';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';

const components: MDXRemoteProps['components'] = {
  h1: (props) => <h2 {...props} className="scroll-mt-20" />,
  h2: (props) => <h2 {...props} className="scroll-mt-20" />,
  h3: (props) => <h2 {...props} className="scroll-mt-20" />,
  h4: (props) => <h2 {...props} className="scroll-mt-20" />,
  h5: (props) => <h2 {...props} className="scroll-mt-20" />,
  h6: (props) => <h2 {...props} className="scroll-mt-20" />,
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const activeSlug = `/${params.slug?.join('/')}`;

  const markdown = await readMarkdown('markdown' + activeSlug);

  if (!markdown) {
    notFound();
  }

  const { content, data } = grayMatter(markdown);

  const headings = await getHeadings(content);

  return (
    <div className="flex">
      <main className="grow">
        <PageHeader heading={data.title} description={data.description} />
        <div className="prose  data-[highlighted-line]">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'append',
                      content: fromHtmlIsomorphic('<span>#</span>', {
                        fragment: true,
                      }),
                    },
                  ],
                ],
              },
            }}
          />
        </div>
        <PrevNextLinks links={componentsLinks} activeSlug={activeSlug} />
      </main>
      <Toc headings={headings} activeSlug={activeSlug} />
    </div>
  );
}
