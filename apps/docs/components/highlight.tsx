interface Props {
  children?: React.ReactNode;
}

export const Highlight = (props: Props) => {
  const { children } = props;

  return (
    <span className="mx-1 px-2 py-1 rounded text-primary-11 bg-primary-3 dark:text-primaryDark-11 dark:bg-primaryDark-3">
      {children}
    </span>
  );
};
