import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getMdx } from '@/lib/get-mdx';
import grayMatter from 'gray-matter';
import { getMdxFiles } from '@/lib/get-mdx-files';
import { getMeta } from '@/lib/get-meta';
import { ContentWithToc } from '@/(docs)/_components/content-with-toc';
import { CompileMdx } from '@/(docs)/_components/compile-mdx';
import { Pager } from '@/(docs)/_components/pager';

interface PageProps {
  params: { slug: string[] };
}

const dir = 'api';

export const generateMetadata = async ({
  params,
}: {
  params: PageProps['params'];
}): Promise<Metadata> => {
  const slug = params.slug?.join('/');

  const markdown = await getMdx(`${dir}/${slug}`);

  if (!markdown) {
    notFound();
  }

  return getMeta(markdown);
};

export async function generateStaticParams() {
  const files = await getMdxFiles(dir);

  return files.map((file) => ({ slug: file }));
}

const Page = async ({ params }: PageProps) => {
  const slug = params.slug?.join('/');

  const markdown = await getMdx(`${dir}/${slug}`);

  if (!markdown) {
    notFound();
  }

  const { content } = grayMatter(markdown);

  return (
    <ContentWithToc>
      <CompileMdx content={content} />
      <Pager activeHref={`${dir}/${slug}`} />
    </ContentWithToc>
  );
};

export default Page;
