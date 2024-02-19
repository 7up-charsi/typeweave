import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  children?: string;
}

const RenderMarkdown = ({ children }: Props) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} className="prose">
      {children}
    </Markdown>
  );
};

export default RenderMarkdown;
