import { SyntaxHighlight } from './syntax-highlight';

interface Props extends React.HTMLAttributes<HTMLElement> {
  'data-lang'?: string;
}

export const CodeBlock = ({ children: _children, ...props }: Props) => {
  const children = _children as string | null;

  if (!children) return null;

  const isInline = !props['data-lang'];

  if (isInline)
    return (
      <code className="mx-1 px-2 py-1 rounded text-primary-11 bg-primary-3 dark:text-primaryDark-11 dark:bg-primaryDark-3">
        {children}
      </code>
    );

  return (
    <code {...props}>
      <SyntaxHighlight code={children} language={props['data-lang']} />
    </code>
  );
};
