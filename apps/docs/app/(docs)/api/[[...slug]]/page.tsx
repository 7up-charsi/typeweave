import { notFound } from 'next/navigation';
import { DocsPager } from '@/components/docs-pager';
import { Metadata } from 'next';
import { getMdx } from '@/lib/get-mdx';
import { readdir } from 'fs/promises';
import { evaluate } from '@mdx-js/mdx';
import path from 'path';
import { mdxComponents } from '@/components/mdx-components';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import grayMatter from 'gray-matter';

// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

interface PageProps {
  params: { slug: string[] };
}

export const generateMetadata = async ({
  params,
}: {
  params: PageProps['params'];
}): Promise<Metadata> => {
  const markdown = await getMdx(params.slug?.join('/'));

  if (!markdown) {
    notFound();
  }

  const { data } = grayMatter(markdown);

  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
};

export async function generateStaticParams() {
  const files = await readdir(path.resolve('content/'), {
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
  const markdown = await getMdx(slug);

  if (!markdown) {
    notFound();
  }

  const { content } = grayMatter(markdown);

  const { default: MdxContent } = await evaluate(content, {
    format: 'mdx',
    Fragment,
    // @ts-ignore
    jsx,
    // @ts-ignore
    jsxs,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });

  return (
    <>
      <MdxContent components={mdxComponents} />
      <DocsPager activeSlug={slug} />
    </>
  );
};

export default Page;
