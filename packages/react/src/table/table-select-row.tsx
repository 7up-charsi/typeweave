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

  const {
    rows,
    removedRows,
    selectedRows,
    setSelectedRows,
    setIsSelctedAllRows,
  } = useTableSelectRowCtx(displayName);

  const identifierRef = React.useRef({});

  React.useEffect(() => {
    rows.set(identifierRef, identifier);
    setIsSelctedAllRows(false);

    return () => {
      rows.delete(identifierRef);
      removedRows.set(identifierRef, identifier);

      setIsSelctedAllRows(false);

      setSelectedRows((prev) => {
        const leftRows = prev.filter(
          (rowIdentifier) => ![...removedRows.values()].includes(rowIdentifier),
        );

        removedRows.clear();

        return leftRows;
      });
    };
  }, [identifier, removedRows, rows, setIsSelctedAllRows, setSelectedRows]);

  return (
    <Slot<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>
      checked={selectedRows.includes(identifier)}
      onChange={(event) => {
        const isSelected = event.target.checked;

        setIsSelctedAllRows(
          isSelected ? selectedRows.length + 1 === rows.size : false,
        );

        setSelectedRows((prev) =>
          isSelected
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
