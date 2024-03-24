import { SyntaxHighlight } from './syntax-highlight';

interface Props {
  children?: string;
  className?: string;
}

export const Code = (props: Props) => {
  const { children, className, ...restProps } = props;

  const lang = className?.match(/(?<prefix>language-)(?<lang>\w+)/)?.groups
    ?.lang;

  if (!lang)
    return (
      <code
        {...restProps}
        className="mx-1 inline-block rounded bg-muted-3 px-1 py-px font-code text-muted-11"
      >
        {children}
      </code>
    );

  return (
    <code {...restProps}>
      <SyntaxHighlight code={children} language={lang} />
    </code>
  );
};
