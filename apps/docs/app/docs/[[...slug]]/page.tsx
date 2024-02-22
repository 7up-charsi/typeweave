import { notFound } from 'next/navigation';
import { readMarkdown } from '@/lib/readMarkdown';
import grayMatter from 'gray-matter';
import { PageHeader } from '@/components/PageHeader';
import PrevNextLinks from '@/components/PrevNextLinks';
import { componentsLinks } from '@/config/componentsLinks';
import { getHeadings } from '@/lib/utils';
import Toc from '@/components/Toc';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { HeadingLink } from '@/components/markdown/HeadingLink';

const components: MDXRemoteProps['components'] = {
  h2: (props) => <HeadingLink as="h2" {...props} />,
  h3: (props) => <HeadingLink as="h3" {...props} />,
  code: (props) => {
    return <code {...props} className="" />;
  },
  pre: (props) => <pre {...props} className="p-4 rounded" />,
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
        <div className="py-4 px-10">
          <PageHeader heading={data.title} description={data.description} />

          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  // @ts-ignore
                  [rehypePrettyCode, { theme: 'one-dark-pro' }],
                  rehypeSlug,
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
