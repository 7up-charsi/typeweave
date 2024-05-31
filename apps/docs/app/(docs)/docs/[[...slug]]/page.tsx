import { notFound } from 'next/navigation';
import { DocsPager } from '@/components/docs-pager';
import { Toc } from '@/components/toc';
import { Metadata } from 'next';
import { getContent } from '@/lib/get-content';
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
  const markdown = await getContent(`docs/${params.slug?.join('/')}`);

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
    <div className="lg:col-start-2 ">
      <main className="overflow-auto px-5 py-4 lg:px-10">
        <MdxContent components={mdxComponents} />
        <DocsPager activeSlug={slug} />
      </main>
      {/* <Toc /> */}
    </div>
  );
};

export default Page;
