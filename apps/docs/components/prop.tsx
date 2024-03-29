interface PropProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Prop = (props: PropProps) => {
  const { children, ...restProps } = props;

  return (
    <code {...restProps} data-highlight>
      {children}
    </code>
  );
};

Prop.displayName = 'Prop';
