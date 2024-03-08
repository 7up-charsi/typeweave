import { SyntaxHighlight } from './syntax-highlight';

interface Props {
  children?: string;
  className?: string;
}

export const Code = (props: Props) => {
  const { children, className, ...restProps } = props;

  const lang = className?.match(/(?<prefix>language-)(?<lang>\w+)/)?.groups
    ?.lang;

  if (!lang) return <code {...restProps}>{children}</code>;

  return (
    <code {...restProps}>
      <SyntaxHighlight code={children} language={lang} />
    </code>
  );
};
