interface Props {
  children?: React.ReactNode;
}

export const Highlight = (props: Props) => {
  const { children } = props;

  return (
    <span className="mx-1 rounded bg-primary-3 px-1 py-px text-primary-11">
      {children}
    </span>
  );
};
