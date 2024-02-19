import { notFound } from 'next/navigation';
import { readMarkdown } from '@/lib/readMarkdown';
import RenderMarkdown from '@/components/RenderMarkdown';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const markdown = await readMarkdown('markdown/docs/' + params.slug.join('/'));

  if (!markdown) {
    notFound();
  }

  return (
    <>
      <RenderMarkdown>{markdown}</RenderMarkdown>
    </>
  );
}
