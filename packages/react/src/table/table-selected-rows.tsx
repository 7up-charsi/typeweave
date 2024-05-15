import React from 'react';
import { useSelectRowCtx } from './table-select-row-root';

export interface TableColumnVisibilityProps {
  children?: (props: { selectedRows: string[] }) => React.ReactNode;
}

const displayName = 'TableColumnVisibility';

export const TableColumnVisibility = (props: TableColumnVisibilityProps) => {
  const { children } = props;

  const { selectedRows } = useSelectRowCtx(displayName);

  return children?.({ selectedRows });
};

TableColumnVisibility.displayName = displayName;
