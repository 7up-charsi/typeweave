import React from 'react';

interface ProseContentProps {
  children?: React.ReactNode;
}

const displayName = 'ProseContent';

export const ProseContent = (props: ProseContentProps) => {
  const { children } = props;

  return (
    <main className="prose max-w-none px-5 py-4 pt-10 prose-headings:text-foreground prose-headings:first-letter:uppercase prose-p:text-foreground prose-a:text-primary-11 prose-code:font-normal prose-code:before:hidden prose-code:after:hidden lg:px-10">
      {children}
    </main>
  );
};

ProseContent.displayName = displayName;
