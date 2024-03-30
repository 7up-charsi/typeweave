export interface HighlightProps {
  children?: React.ReactNode;
}

export const Highlight = (props: HighlightProps) => {
  const { children } = props;

  return (
    <span className="rounded bg-primary-9 px-1 text-white">{children}</span>
  );
};

Highlight.displayName = 'Highlight';
