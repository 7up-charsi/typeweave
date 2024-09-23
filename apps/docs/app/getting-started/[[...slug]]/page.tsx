import { EditThisPage } from '@/app/_scoped/edit-this-page';
import { ProseContent } from '../../_scoped/prose-content';
import { CompileMdx } from '../../_scoped/compile-mdx';
import { getMdxFiles } from '@/lib/get-mdx-files';
import { Pager } from '../../_scoped/pager';
import { notFound } from 'next/navigation';
import { getMeta } from '@/lib/get-meta';
import { Toc } from '../../_scoped/toc';
import { getMdx } from '@/lib/get-mdx';
import grayMatter from 'gray-matter';
import { Metadata } from 'next';

interface PageProps {
  params: { slug: string[] };
}

const dir = 'getting-started';

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

  const path = `${dir}/${slug}`;

  const markdown = await getMdx(path);

  if (!markdown) {
    notFound();
  }

  const { content } = grayMatter(markdown);

  return (
    <>
      <ProseContent>
        <CompileMdx content={content} />
        <EditThisPage path={path} />
        <Pager activeHref={path} />
      </ProseContent>

      <Toc />
    </>
  );
};

export default Page;
