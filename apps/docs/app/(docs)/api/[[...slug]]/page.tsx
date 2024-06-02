import { notFound } from 'next/navigation';
import { DocsPager } from '@/components/docs-pager';
import { Metadata } from 'next';
import { getMdx } from '@/lib/get-mdx';
import grayMatter from 'gray-matter';
import { getMdxFiles } from '@/lib/get-mdx-files';
import { CompileMdx } from '@/components/compile-mdx';
import { getMeta } from '@/lib/get-meta';
import { ContentWithToc } from '@/components/content-with-toc';

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
      <DocsPager activeHref={`${dir}/${slug}`} />
    </ContentWithToc>
  );
};

export default Page;
