interface Props {
  heading: string;
  description?: string;
}

export const PageHeader = ({ heading, description }: Props) => {
  return (
    <div className="text-muted-11 dark:text-mutedDark-11 mb-10 flex flex-col gap-2">
      <h1
        className="text-3xl first-letter:uppercase font-medium"
        aria-description={description}
      >
        {heading}
      </h1>
      {description && <p className="first-letter:uppercase">{description}</p>}
    </div>
  );
};
