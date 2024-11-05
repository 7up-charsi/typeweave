import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { getMdxFiles } from '@/utils/get-mdx-files';
import { Button } from '@typeweave/react/button';
import { mdxComponents } from '@/mdx-components';
import remarkDirective from 'remark-directive';
import { Pager } from '@/app/_scoped/pager';
import { getMeta } from '@/utils/get-meta';
import { notFound } from 'next/navigation';
import { GithubIcon } from 'lucide-react';
import { getMdx } from '@/utils/get-mdx';
import { Toc } from '@/app/_scoped/toc';
import { evaluate } from '@mdx-js/mdx';
import grayMatter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import React from 'react';

interface PageProps {
  params: {
    dir: string;
    slug: string[];
  };
}

const repoUrl = process.env.NEXT_PUBLIC_REPO_URL;

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
    jsx,
    jsxs,
    remarkPlugins: [remarkGfm, remarkDirective],
    rehypePlugins: [rehypeSlug],
  });

  if (!repoUrl) throw new Error('repo url is not defined');

  return (
    <>
      <main className="prose-a:prose-a prose mx-auto w-full max-w-[calc(theme(screens.md)+100px)] overflow-auto px-5 pb-5 text-foreground prose-headings:text-foreground prose-headings:first-letter:uppercase prose-strong:text-muted-12 prose-code:font-normal prose-pre:my-0 prose-pre:font-normal xl:px-10">
        <p className="mt-5 text-balance px-5 text-center text-info-11">
          <span className="rounded bg-info-3 px-5 py-3">
            Documentation is under development.
          </span>
        </p>

        {/* when remove above info alert, also remove this by adding pt-10 on main */}
        <div className="mt-10"></div>

        <MdxContent components={mdxComponents} />

        <div className="mt-10 flex justify-end">
          <Button
            asChild
            variant="text"
            startContent={<GithubIcon />}
            className="not-prose"
          >
            <a
              href={`${repoUrl.replace(/\/+$/, '')}/edit/main/apps/docs/content/${path.replace(/^\/+/, '')}.mdx`}
              target="_blank"
              rel="noreferrer"
            >
              Edit this page
            </a>
          </Button>
        </div>

        <Pager activeHref={path} />
      </main>

      <Toc />
    </>
  );
};

export default Page;
