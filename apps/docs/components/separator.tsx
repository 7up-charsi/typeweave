interface Props {
  className?: string;
}

export const Separator = (props: Props) => {
  const { className } = props;

  return <div className={`h-px bg-muted-4 mt-4 ${className}`}></div>;
};
