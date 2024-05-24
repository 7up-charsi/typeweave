import React from 'react';
import { createContextScope } from '../context';
import { useControlled } from '../use-controlled';

export interface TableSelectRowRootProps {
  children?: React.ReactNode;
  defaultSelectedRows?: string[];
  selectedRows?: string[];
  onSelectionChange?: (value: string[]) => void;
}

export interface TableSelectRowRootMethods {
  reset: () => void;
}

interface TableSelectRowCtxProps {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  rows: Map<React.RefObject<object>, string>;
  isSelctedAllRows: boolean;
  setIsSelctedAllRows: React.Dispatch<React.SetStateAction<boolean>>;
}

const displayName = 'TableSelectRowRoot';

const [TableSelectRowCtx, useTableSelectRowCtx] =
  createContextScope<TableSelectRowCtxProps>(displayName);

export { useTableSelectRowCtx };

export const TableSelectRowRoot = React.forwardRef<
  TableSelectRowRootMethods,
  TableSelectRowRootProps
>((props, ref) => {
  const {
    children,
    defaultSelectedRows,
    onSelectionChange,
    selectedRows: selectedRowsProp,
  } = props;

  const rows = React.useRef<Map<React.RefObject<object>, string>>(
    new Map(),
  ).current;

  const [selectedRows, setSelectedRows] = useControlled({
    default: defaultSelectedRows ?? [],
    controlled: selectedRowsProp,
    name: displayName,
    state: 'selectedRows',
    onChange: onSelectionChange,
  });

  const [isSelctedAllRows, setIsSelctedAllRows] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedRows([]);
    },
  }));

  return (
    <TableSelectRowCtx
      rows={rows}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      isSelctedAllRows={isSelctedAllRows}
      setIsSelctedAllRows={setIsSelctedAllRows}
    >
      {children}
    </TableSelectRowCtx>
  );
});

TableSelectRowRoot.displayName = displayName;
