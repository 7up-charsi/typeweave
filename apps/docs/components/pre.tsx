interface Props extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Pre = (props: Props) => {
  return (
    <pre {...props} className="hljs rounded p-4 mt-4 relative overflow-auto" />
  );
};
