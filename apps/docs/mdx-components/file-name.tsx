import React from 'react';

interface FileNameProps {
  children?: React.ReactNode;
}

const displayName = 'FileName';

export const FileName = (props: FileNameProps) => {
  const { children } = props;

  return (
    <div className="[&_+_*]:mt-0">
      <span className="ml-2 inline-block rounded-t bg-muted-3 px-2 py-1 text-sm font-medium">
        {children}
      </span>
    </div>
  );
};

FileName.displayName = displayName;
