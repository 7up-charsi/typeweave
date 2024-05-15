import React from 'react';
import { useSelectRowCtx } from './table-select-row-root';

export interface TableSelectedRowsProps {
  children?: (props: { selectedRows: string[] }) => React.ReactNode;
}

const displayName = 'TableSelectedRows';

export const TableSelectedRows = (props: TableSelectedRowsProps) => {
  const { children } = props;

  const { selectedRows } = useSelectRowCtx(displayName);

  return children?.({ selectedRows });
};

TableSelectedRows.displayName = displayName;
