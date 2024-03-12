interface Props extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Pre = (props: Props) => {
  return (
    <pre
      {...props}
      className="hljs relative mt-4 overflow-auto rounded border border-muted-6 p-4"
    />
  );
};
