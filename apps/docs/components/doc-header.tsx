interface Props {
  title: string;
  description: string;
}

export const DocHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1
        className="text-3xl first-letter:uppercase font-medium"
        aria-description={description}
      >
        {title}
      </h1>
      {description && <p className="first-letter:uppercase">{description}</p>}
    </div>
  );
};
