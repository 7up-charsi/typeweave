import React from 'react';
import { useTableSelectRowCtx } from './table-select-row-root';

export interface TableSelectedRowsProps {
  children?: (props: { selectedRows: string[] }) => React.ReactNode;
}

const displayName = 'TableSelectedRows';

export const TableSelectedRows = (props: TableSelectedRowsProps) => {
  const { children } = props;

  const { selectedRows } = useTableSelectRowCtx(displayName);

  return children?.({ selectedRows });
};

TableSelectedRows.displayName = displayName;
