interface Props {
  children?: React.ReactNode;
}

export const CodePreview = ({ children }: Props) => {
  return (
    <div className="p-4 min-h-40 overflow-auto flex items-center justify-center rounded-xl border border-muted-6 bg-muted-2 dark:border-mutedDark-6 dark:bg-mutedDark-2">
      {children}
    </div>
  );
};
