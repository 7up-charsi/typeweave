import React from 'react';
import { createContextScope } from '../context';
import { useControllableState } from '../use-controllable-state';

export interface TableSelectRowRootProps {
  children?: React.ReactNode;
  defaultSelectedRows?: string[];
  selectedRows?: string[];
  onSelectionChange?: (value: string[]) => void;
}

interface SelectRowCtxProps {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  rows: Map<React.RefObject<object>, string>;
}

const displayName = 'TableSelectRowRoot';

const [SelectRowCtx, useSelectRowCtx] =
  createContextScope<SelectRowCtxProps>(displayName);

export { useSelectRowCtx };

export const TableSelectRowRoot = (props: TableSelectRowRootProps) => {
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

  return (
    <SelectRowCtx
      rows={rows}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
    >
      {children}
    </SelectRowCtx>
  );
};

TableSelectRowRoot.displayName = displayName;
