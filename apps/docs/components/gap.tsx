interface Props {
  margin?: string;
}

export const Gap = (props: Props) => {
  const { margin } = props;

  return <div style={{ margin: margin ?? '2px 0' }} className="h-px" />;
};
