import Markdown, { Components } from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';

const components: Components = {
  h1: (props) => <h2 {...props} className="scroll-mt-20" />,
  h2: (props) => <h2 {...props} className="scroll-mt-20" />,
  h3: (props) => <h2 {...props} className="scroll-mt-20" />,
  h4: (props) => <h2 {...props} className="scroll-mt-20" />,
  h5: (props) => <h2 {...props} className="scroll-mt-20" />,
  h6: (props) => <h2 {...props} className="scroll-mt-20" />,
};

interface Props {
  children?: string;
}

const RenderMarkdown = ({ children }: Props) => {
  return (
    <Markdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            content: fromHtmlIsomorphic('<span>#</span>', { fragment: true }),
          },
        ],
      ]}
    >
      {children}
    </Markdown>
  );
};

export default RenderMarkdown;
