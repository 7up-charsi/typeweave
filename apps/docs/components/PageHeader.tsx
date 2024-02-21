interface Props extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
}

export function PageHeader({ heading, description, ...props }: Props) {
  return (
    <div {...props}>
      <h1>{heading}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
