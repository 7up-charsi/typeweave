import React from 'react';
import { createContextScope } from '../context';
import { useControlled } from '../use-controlled';

export type ColumnVisibility = Record<string, boolean>;

type _Row = Record<string, unknown>;

type NestedKeys<Row, ParentKey extends string = ''> = {
  [K in keyof Row]: K extends string
    ? Row[K] extends object
      ? `${ParentKey}${K}` | NestedKeys<Row[K], `${ParentKey}${K}.`>
      : `${ParentKey}${K}`
    : never;
}[keyof Row];

type AccessorValueType<BeforeDotObject, Acc> =
  Acc extends `${infer ParentObject}.${infer NestedKey}`
    ? AccessorValueType<
        BeforeDotObject[ParentObject & keyof BeforeDotObject],
        NestedKey
      >
    : BeforeDotObject[Acc & keyof BeforeDotObject];

type TableColumnProps<Row> = {
  identifier: string;
  header: string | ((data: Row[]) => React.ReactNode);
  visibility?: boolean;
  visibilityTitle?: string;
  hideable?: boolean;
  classNames?: {
    th?: string;
    td?: string;
  };
};

export type TableColumn<K, Row> =
  | ({
      accessor: K;
      cell?: (
        val: AccessorValueType<Row, K>,
        row: Row,
        data: Row[],
      ) => React.ReactNode;
    } & TableColumnProps<Row>)
  | ({
      accessor?: undefined;
      cell?: (row: Row, data: Row[]) => React.ReactNode;
    } & TableColumnProps<Row>);

type TableColumns<Row> = {
  [K in NestedKeys<Row>]: TableColumn<K, Row>;
}[NestedKeys<Row>][];

type GetRowKey<R = _Row> = (row: R) => string;

export interface TableRootProps<R = _Row> {
  data: R[];
  columns: TableColumns<R>;
  getRowKey?: GetRowKey<R>;
  children?: React.ReactNode;
  columnVisibility?: ColumnVisibility;
  onColumnVisibilityChange?: (value: ColumnVisibility) => void;
}

interface RootContext {
  data: _Row[];
  columns: TableColumns<_Row>;
  getRowKey?: GetRowKey<_Row>;
  columnVisibility: ColumnVisibility;
  setColumnVisibility: ReturnType<typeof useControlled<ColumnVisibility>>[1];
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

  const [columnVisibility, setColumnVisibility] = useControlled({
    default: columns?.reduce<ColumnVisibility>(
      (acc, col) => ((acc[col.identifier] = col.visibility), acc),
      {},
    ),
    controlled: visibilityStateProp,
    name: displayName,
    state: 'columnVisibility',
    onChange: onColumnVisibilityChange,
  });

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const set = new Set(columns?.map((ele) => ele.identifier));

      if (columns && columns?.length !== set.size)
        throw new Error(
          `${displayName}, Duplicate \`column identifier\` found.`,
        );
    }
  }, [columns]);

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
