interface Props {
  children?: React.ReactNode;
}

export const CodePreview = ({ children }: Props) => {
  return (
    <div className="p-5 min-h-40 max-h-60 overflow-auto flex items-center justify-center border border-muted-4 dark:border-mutedDark-4 rounded bg-muted-2">
      {children}
    </div>
  );
};
