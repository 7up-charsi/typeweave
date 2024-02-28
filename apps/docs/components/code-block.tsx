interface Props extends React.HTMLAttributes<HTMLElement> {
  'data-language'?: string;
}

export const CodeBlock = (props: Props) => {
  const isInline = !props['data-language'];

  if (isInline)
    return (
      <code
        {...props}
        className="bg-muted-5 px-2 py-1 rounded text-muted-12 mx-1 dark:bg-mutedDark-4 dark:text-mutedDark-12"
      />
    );

  return <code {...props} />;
};
