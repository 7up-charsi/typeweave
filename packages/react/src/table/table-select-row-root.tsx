import React from 'react';
import { createContextScope } from '../context';
import { useControllableState } from '../use-controllable-state';

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

  const [selectedRows, setSelectedRows] = useControllableState({
    defaultValue: defaultSelectedRows ?? [],
    value: selectedRowsProp,
    onChange: onSelectionChange,
  });

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
    >
      {children}
    </TableSelectRowCtx>
  );
});

TableSelectRowRoot.displayName = displayName;
