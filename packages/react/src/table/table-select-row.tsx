import React from 'react';
import { useSelectRowCtx } from './table-select-row-root';
import { Slot } from '../slot';

export interface TableSelectRowProps {
  children?: React.ReactNode;
  identifier: string;
}

const displayName = 'TableSelectRow';

export const TableSelectRow = (props: TableSelectRowProps) => {
  const { children, identifier } = props;

  const { rows, selectedRows, setSelectedRows } = useSelectRowCtx(displayName);

  const identifierRef = React.useRef({ identifier });

  React.useEffect(() => {
    rows.set(identifierRef, identifier);

    return () => {
      rows.delete(identifierRef);
    };
  }, [identifier, rows]);

  return (
    <Slot<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>
      checked={selectedRows.includes(identifier)}
      onChange={(event) => {
        setSelectedRows((prev) =>
          event.target.checked
            ? [...prev, identifier]
            : prev.filter((ele) => ele !== identifier),
        );
      }}
    >
      {children}
    </Slot>
  );
};

TableSelectRow.displayName = displayName;
