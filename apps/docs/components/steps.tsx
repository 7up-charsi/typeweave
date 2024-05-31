interface Props {
  children?: React.ReactNode;
}

export const Steps = (props: Props) => {
  const { children } = props;

  return (
    <div className="relative border-l border-l-muted-6 pl-5 [counter-reset:step] before:absolute before:left-0 before:top-0 before:size-3 before:-translate-x-1/2 before:rounded-full before:bg-muted-5 after:absolute after:bottom-0 after:left-0 after:size-3 after:-translate-x-1/2 after:rounded-full after:bg-muted-5 [&_h3]:relative [&_h3]:[counter-increment:step] [&_h3]:before:absolute [&_h3]:before:-left-5 [&_h3]:before:flex [&_h3]:before:size-7 [&_h3]:before:-translate-x-1/2 [&_h3]:before:items-center [&_h3]:before:justify-center [&_h3]:before:rounded-full [&_h3]:before:bg-muted-5 [&_h3]:before:text-base [&_h3]:before:content-[counter(step)]">
      {children}
    </div>
  );
};
