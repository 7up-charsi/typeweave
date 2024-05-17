import React from 'react';
import { useTableSelectRowCtx } from './table-select-row-root';
import { Slot } from '../slot';

export interface TableSelectRowProps {
  children?: React.ReactNode;
  identifier: string;
}

const displayName = 'TableSelectRow';

export const TableSelectRow = (props: TableSelectRowProps) => {
  const { children, identifier } = props;

  const { rows, selectedRows, setSelectedRows, setIsSelctedAllRows } =
    useTableSelectRowCtx(displayName);

  const identifierRef = React.useRef({});

  React.useEffect(() => {
    rows.set(identifierRef, identifier);
    setIsSelctedAllRows(false);

    return () => {
      rows.delete(identifierRef);

      setSelectedRows((prev) =>
        prev.filter((rowIdentifier) => rowIdentifier !== identifier),
      );
    };
  }, [identifier, rows, setIsSelctedAllRows, setSelectedRows]);

  return (
    <Slot<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>
      checked={selectedRows.includes(identifier)}
      onChange={(event) => {
        setIsSelctedAllRows(
          !!selectedRows.length && selectedRows.length === rows.size,
        );

        setSelectedRows((prev) =>
          event.target.checked
            ? [...prev, identifier]
            : prev.filter((rowIdentifier) => rowIdentifier !== identifier),
        );
      }}
    >
      {children}
    </Slot>
  );
};

TableSelectRow.displayName = displayName;
