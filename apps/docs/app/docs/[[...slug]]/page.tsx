import { notFound } from 'next/navigation';
import { DocsPager } from '@/components/docs-pager';
import { Toc } from '@/components/toc';
import { RenderMarkdown } from '@/components/render-markdown';
import { Metadata } from 'next';
import { getContent } from '@/lib/get-content';
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
    metaTitle?: string;
    metaDescription?: string;
  }>({
    source: markdown,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.metaTitle,
    description: frontmatter.metaDescription,
  };
};

const Page = async ({ params }: PageProps) => {
  const slug = params.slug?.join('/');
  const markdown = await getContent(`docs/${slug}`);

  if (!markdown) {
    notFound();
  }

  return (
    <div className="flex">
      <main className="grow py-4 px-16">
        {/* <PageHeader title={data.title} description={data.description} /> */}
        <RenderMarkdown source={markdown} />
        <DocsPager activeSlug={slug} />
      </main>
      <Toc />
    </div>
  );
};

export default Page;
