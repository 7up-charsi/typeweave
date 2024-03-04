interface Props {
  children?: React.ReactNode;
}

export const Highlight = (props: Props) => {
  const { children } = props;

  return (
    <span className="mx-1 px-1 py-px rounded text-primary-11 bg-primary-3">
      {children}
    </span>
  );
};
