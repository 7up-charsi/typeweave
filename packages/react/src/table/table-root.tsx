import React from 'react';
import { createContextScope } from '../context';
import {
  UseControllableStateReturn,
  useControllableState,
} from '../use-controllable-state';

export type ColumnVisibility = Record<string, boolean>;

type _Row = Record<string, unknown>;

export type TableColumn<Row = _Row> = {
  [K in keyof Row]: {
    accessor: (row: Row) => Row[K];
    header: (data: Row[]) => React.ReactNode;
    identifier: string;
    cell?: (val: Row[K], row: Row, data: Row[]) => React.ReactNode;
    visibility?: boolean;
    visibilityTitle?: string;
    hideable?: boolean;
    classNames?: {
      th?: string;
      td?: string;
    };
  };
}[keyof Row];

type GetRowKey<R = _Row> = (row: R) => string;

export interface TableRootProps<R = _Row> {
  data: R[];
  columns: TableColumn<R>[];
  getRowKey?: GetRowKey<R>;
  children?: React.ReactNode;
  columnVisibility?: ColumnVisibility;
  onColumnVisibilityChange?: (value: ColumnVisibility) => void;
}

interface RootContext
  extends Omit<
    TableRootProps,
    'onColumnVisibilityChange' | 'children' | 'columnVisibility'
  > {
  columnVisibility: ColumnVisibility;
  setColumnVisibility: UseControllableStateReturn<ColumnVisibility>[1];
}

const displayName = 'TableRoot';

const [TableCtx, useTableCtx] = createContextScope<RootContext>(displayName);

export { useTableCtx };

const TableRootImpl = (props: TableRootProps) => {
  const {
    data,
    columns: userColumns,
    getRowKey,
    columnVisibility: visibilityStateProp,
    onColumnVisibilityChange,
    children,
  } = props;

  const columns = React.useMemo(
    () =>
      userColumns?.map((ele) => ({
        ...ele,
        visibility: ele.visibility ?? true,
        hideable: ele.hideable ?? true,
        identifier: ele.identifier.replaceAll(' ', '-'),
      })),
    [userColumns],
  );

  const [columnVisibility, setColumnVisibility] = useControllableState({
    defaultValue: columns?.reduce<ColumnVisibility>(
      (acc, col) => ((acc[col.identifier] = col.visibility), acc),
      {},
    ),
    value: visibilityStateProp,
    onChange: onColumnVisibilityChange,
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const set = new Set(columns?.map((ele) => ele.identifier));

      if (columns && columns?.length !== set.size)
        throw new Error(
          `${displayName}, Duplicate \`column identifier\` found.`,
        );
    }, [columns]);
  }

  if (!columns) return;
  if (!data) return;

  return (
    <TableCtx
      data={data}
      columns={columns}
      getRowKey={getRowKey}
      columnVisibility={columnVisibility}
      setColumnVisibility={setColumnVisibility}
    >
      {children}
    </TableCtx>
  );
};

TableRootImpl.displayName = displayName;

export const TableRoot = TableRootImpl as <R>(
  props: TableRootProps<R>,
) => React.ReactNode;
