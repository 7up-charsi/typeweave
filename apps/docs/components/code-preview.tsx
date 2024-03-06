interface Props {
  children?: React.ReactNode;
}

export const CodePreview = ({ children }: Props) => {
  return (
    <div className="mt-4 p-4 min-h-40 overflow-auto flex items-center justify-center rounded border border-muted-6 bg-muted-2">
      {children}
    </div>
  );
};
