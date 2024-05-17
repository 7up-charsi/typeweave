import React from 'react';
import { Slot } from '../slot';
import { useTableSelectRowCtx } from './table-select-row-root';
import { createContextScope } from '../context';

export interface TableSelectAllRowsProps {
  children?: React.ReactNode;
}

interface TableSelectAllRowCtxProps {
  setRerenderSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const displayName = 'TableSelectAllRows';

const [TableSelectAllRowCtx, useTableSelectAllRowCtx] =
  createContextScope<TableSelectAllRowCtxProps>(displayName);

export { useTableSelectAllRowCtx };

export const TableSelectAllRows = (props: TableSelectAllRowsProps) => {
  const { children } = props;

  const [, setRerenderSelectAll] = React.useState(false);

  const { rows, selectedRows, setSelectedRows } =
    useTableSelectRowCtx(displayName);

  return (
    <TableSelectAllRowCtx setRerenderSelectAll={setRerenderSelectAll}>
      <Slot<
        HTMLInputElement,
        React.InputHTMLAttributes<HTMLInputElement> & {
          indeterminate?: boolean;
        }
      >
        checked={!!selectedRows.length && selectedRows.length === rows.size}
        indeterminate={
          !!selectedRows.length && selectedRows.length !== rows.size
        }
        onChange={(event) => {
          setSelectedRows(event.target.checked ? [...rows.values()] : []);
        }}
      >
        {children}
      </Slot>
    </TableSelectAllRowCtx>
  );
};

TableSelectAllRows.displayName = displayName;
