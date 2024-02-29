interface Props {
  children?: React.ReactNode;
}

export const CodePreview = ({ children }: Props) => {
  return (
    <div className="p-4 min-h-40 max-h-60 overflow-auto flex items-center justify-center border border-muted-6 dark:border-mutedDark-6 rounded-xl bg-muted-2">
      {children}
    </div>
  );
};
