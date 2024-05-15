import React from 'react';
import { Slot } from '../slot';
import { useSelectRowCtx } from './table-select-row-root';

export interface TableSelectAllRowsProps {
  children?: React.ReactNode;
}

const displayName = 'TableSelectAllRows';

export const TableSelectAllRows = (props: TableSelectAllRowsProps) => {
  const { children } = props;

  const { rows, selectedRows, setSelectedRows } = useSelectRowCtx(displayName);

  return (
    <Slot<
      HTMLInputElement,
      React.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }
    >
      checked={!!selectedRows.length && selectedRows.length === rows.size}
      indeterminate={!!selectedRows.length && selectedRows.length !== rows.size}
      onChange={(event) => {
        setSelectedRows(event.target.checked ? [...rows.values()] : []);
      }}
    >
      {children}
    </Slot>
  );
};

TableSelectAllRows.displayName = displayName;
