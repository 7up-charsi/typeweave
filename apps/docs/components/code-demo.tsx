interface Props {
  code?: string;
}

export const CodeDemo = ({ code }: Props) => {
  return (
    <div className="p-3 h-52 flex items-center justify-center border border-muted-6 dark:border-mutedDark-6">
      {code}
    </div>
  );
};
