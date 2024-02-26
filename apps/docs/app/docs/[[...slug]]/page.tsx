import { notFound } from 'next/navigation';
import { readMarkdown } from '@/lib/read-markdown';
import grayMatter from 'gray-matter';
import { PageHeader } from '@/components/page-header';
import { PrevNextLinks } from '@/components/prev-next-links';
import { componentsLinks } from '@/config/components-links';
import { getHeadings } from '@/lib/utils';
import { Toc } from '@/components/toc';
import { RenderMarkdown } from '@/components/render-markdown';

const Page = async ({ params }: { params: { slug: string[] } }) => {
  const activeSlug = `/${params.slug?.join('/')}`;

  const markdown = await readMarkdown('markdown/docs' + activeSlug);

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
          <RenderMarkdown source={content} />
        </div>
        <PrevNextLinks links={componentsLinks} activeSlug={activeSlug} />
      </main>
      <Toc headings={headings} />
    </div>
  );
};

export default Page;
