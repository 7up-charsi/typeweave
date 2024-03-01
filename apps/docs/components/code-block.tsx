import { CopyCode } from './copy-code';
import { SyntaxHighlight } from './syntax-highlight';

interface Props extends React.HTMLAttributes<HTMLElement> {
  'data-inline'?: string;
  'data-lang'?: string;
}

export const CodeBlock = ({ children: _children, ...props }: Props) => {
  const children = _children as string | null;

  if (!children) return null;

  if (props['data-inline']) return <code {...props}>{children}</code>;

  return (
    <code {...props}>
      <CopyCode code={children} />
      <SyntaxHighlight code={children} language={props['data-lang']} />
    </code>
  );
};
