import React from 'react';
import { Slot } from '../slot';
import { useTableSelectRowCtx } from './table-select-row-root';

export interface TableSelectAllRowsProps {
  children?: React.ReactNode;
}

const displayName = 'TableSelectAllRows';

export const TableSelectAllRows = (props: TableSelectAllRowsProps) => {
  const { children } = props;

  const {
    rows,
    selectedRows,
    setSelectedRows,
    isSelctedAllRows,
    setIsSelctedAllRows,
  } = useTableSelectRowCtx(displayName);

  return (
    <Slot<
      HTMLInputElement,
      React.InputHTMLAttributes<HTMLInputElement> & {
        indeterminate?: boolean;
      }
    >
      checked={isSelctedAllRows}
      indeterminate={!!selectedRows.length && selectedRows.length !== rows.size}
      onChange={(event) => {
        if (!rows.size) return;

        const isSelected = event.target.checked;

        setIsSelctedAllRows(isSelected);
        setSelectedRows(isSelected ? [...rows.values()] : []);
      }}
    >
      {children}
    </Slot>
  );
};

TableSelectAllRows.displayName = displayName;
