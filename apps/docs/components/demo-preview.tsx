export interface DemoPreviewProps {
  children?: React.ReactNode;
}

export const DemoPreview = (props: DemoPreviewProps) => {
  const { children } = props;

  return (
    <div className="mt-4 flex min-h-48 items-center justify-center rounded-t border border-b-0 border-inherit p-5">
      {children}
    </div>
  );
};

DemoPreview.displayName = 'DemoPreview';
