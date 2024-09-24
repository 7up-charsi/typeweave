import { remarkAdmonitions } from '@/utils/remark-admonitions';
import { EditThisPage } from '@/app/_scoped/edit-this-page';
import { getMdxFiles } from '@/utils/get-mdx-files';
import { mdxComponents } from '@/mdx-components';
import remarkDirective from 'remark-directive';
import { Pager } from '@/app/_scoped/pager';
import { getMeta } from '@/utils/get-meta';
import { notFound } from 'next/navigation';
import { getMdx } from '@/utils/get-mdx';
import { Toc } from '@/app/_scoped/toc';
import { evaluate } from '@mdx-js/mdx';
import grayMatter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import React from 'react';

// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

interface PageProps {
  params: {
    dir: string;
    slug: string[];
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: PageProps['params'];
}): Promise<Metadata> => {
  const dir = params.dir;
  const slug = params.slug?.join('/');

  const markdown = await getMdx(`${dir}/${slug}`);

  if (!markdown) {
    notFound();
  }

  return getMeta(markdown);
};

export async function generateStaticParams({
  params,
}: {
  params: { dir: string };
}) {
  const dir = params.dir;

  const files = await getMdxFiles(dir);

  return files.map((file) => ({ slug: file }));
}

const Page = async ({ params }: PageProps) => {
  const dir = params.dir;
  const slug = params.slug?.join('/');

  const path = `${dir}/${slug}`;

  const markdown = await getMdx(path);

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
    remarkPlugins: [remarkGfm, remarkDirective, remarkAdmonitions],
    rehypePlugins: [rehypeSlug],
  });

  return (
    <>
      <main className="prose max-w-none px-5 py-4 pt-10 prose-headings:text-foreground prose-headings:first-letter:uppercase prose-p:text-foreground prose-a:text-primary-11 prose-code:font-normal prose-code:before:hidden prose-code:after:hidden lg:px-10">
        <MdxContent components={mdxComponents} />

        <EditThisPage path={path} />

        <Pager activeHref={path} />
      </main>

      <Toc />
    </>
  );
};

export default Page;
