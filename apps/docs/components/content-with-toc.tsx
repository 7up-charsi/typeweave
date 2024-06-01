import React from 'react';
import { Toc } from './toc';

interface ContentWithTocProps {
  children?: React.ReactNode;
}

const displayName = 'ContentWithToc';

export const ContentWithToc = (props: ContentWithTocProps) => {
  const { children } = props;

  return (
    /* The second column's width is set to automatically adjust. 
    This is because the table of contents (TOC) determines its own width. 
    As a result, if there are no headings in the document, 
    the content will fill the entire available space. */

    <div className="lg:grid lg:grid-cols-[1fr_auto]">
      <main className="custom-prose px-5 py-4 lg:px-10">
        {children}
      </main>
      <Toc />
    </div>
  );
};

ContentWithToc.displayName = displayName;
