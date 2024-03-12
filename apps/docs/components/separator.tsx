interface Props {
  className?: string;
}

export const Separator = (props: Props) => {
  const { className } = props;

  return <div className={`mt-4 h-px bg-muted-4 ${className}`}></div>;
};
