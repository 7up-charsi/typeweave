import React from 'react';
import { useTableSelectRowCtx } from './table-select-row-root';

export interface TableSelectedRowsProps {
  children?: (props: {
    selectedRows: string[];
    isSelctedAllRows: boolean;
    selectedCount: number;
    unselectedCount: number;
  }) => React.ReactNode;
}

const displayName = 'TableSelectedRows';

export const TableSelectedRows = (props: TableSelectedRowsProps) => {
  const { children } = props;

  const { selectedRows, isSelctedAllRows, rows } =
    useTableSelectRowCtx(displayName);

  return children?.({
    selectedRows,
    isSelctedAllRows,
    selectedCount: selectedRows.length,
    unselectedCount: rows.size - selectedRows.length,
  });
};

TableSelectedRows.displayName = displayName;
