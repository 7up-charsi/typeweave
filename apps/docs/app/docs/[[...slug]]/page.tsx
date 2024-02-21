import { notFound } from 'next/navigation';
import { readMarkdown } from '@/lib/readMarkdown';
import grayMatter from 'gray-matter';
import RenderMarkdown from '@/components/RenderMarkdown';
import { PageHeader } from '@/components/PageHeader';
import PrevNextLinks from '@/components/PrevNextLinks';
import { componentsLinks } from '@/config/componentsLinks';
import { getHeadings } from '@/lib/utils';
import Toc from '@/components/Toc';

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
        <div className="prose">
          <RenderMarkdown>{content}</RenderMarkdown>
        </div>
        <PrevNextLinks links={componentsLinks} activeSlug={activeSlug} />
      </main>
      <Toc headings={headings} activeSlug={activeSlug} />
    </div>
  );
}
