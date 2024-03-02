import { notFound } from 'next/navigation';
import { DocsPager } from '@/components/docs-pager';
import { Toc } from '@/components/toc';
import { RenderMarkdown } from '@/components/render-markdown';
import { Metadata } from 'next';
import { getContent } from '@/lib/get-content';
import { readdir } from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

interface PageProps {
  params: { slug: string[] };
}

export const generateMetadata = async ({
  params,
}: {
  params: PageProps['params'];
}): Promise<Metadata> => {
  const markdown = await getContent(`docs/${params.slug?.join('/')}`);

  if (!markdown) {
    notFound();
  }

  const { frontmatter } = await compileMDX<{
    metaTitle: string;
    metaDescription: string;
  }>({
    source: markdown,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.metaTitle,
    description: frontmatter.metaDescription,
  };
};

export async function generateStaticParams() {
  const files = await readdir(path.resolve('content/docs'), {
    recursive: true,
  });

  const onlyFiles = files.reduce<string[][]>(
    (acc, file) =>
      file.endsWith('.mdx')
        ? [...acc, file.replace('.mdx', '').split('\\')]
        : acc,
    [],
  );

  return onlyFiles.map((slug) => [{ slug }]);
}

const Page = async ({ params }: PageProps) => {
  const slug = params.slug?.join('/');
  const markdown = await getContent(`docs/${slug}`);

  if (!markdown) {
    notFound();
  }

  return (
    <>
      <main className="col-start-2 py-4 px-16 overflow-auto">
        <RenderMarkdown source={markdown} />
        <DocsPager activeSlug={slug} />
      </main>
      <Toc />
    </>
  );
};

export default Page;
