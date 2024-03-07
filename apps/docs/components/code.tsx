import { SyntaxHighlight } from './syntax-highlight';

interface Props {
  code?: string;
  language?: string;
}

export const Code = (props: Props) => {
  const { code, language, ...restProps } = props;

  if (!language) return <code {...restProps}>{code}</code>;

  return (
    <code
      {...restProps}
      className="hljs rounded p-4 mt-4 relative overflow-auto block"
    >
      <SyntaxHighlight code={code} language={language} />
    </code>
  );
};
