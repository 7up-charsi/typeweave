interface Props {
  children?: React.ReactNode;
}

export const Highlight = ({ children }: Props) => {
  return (
    <span className="bg-primary-3 text-primary-11 dark:bg-primaryDark-3 dark:text-primaryDark-11 px-1 py-px rounded">
      {children}
    </span>
  );
};
