import React from 'react';
import { createContextScope } from '../context';
import { CustomError } from '../custom-error';
import {
  UseControllableStateReturn,
  useControllableState,
} from '../use-controllable-state';

type VisibilityState = Record<string, boolean>;

type _Row = Record<string, unknown>;

type Column<Row = _Row> = {
  [K in keyof Row]: {
    accessor: (row: Row) => Row[K];
    header: (data: Row[]) => React.ReactNode;
    identifier: string;
    cell?: (val: Row[K], row: Row, data: Row[]) => React.ReactNode;
    visibility?: boolean;
    visibilityTitle?: string;
    hideable?: boolean;
  };
}[keyof Row];

type GetRowKey<R = _Row> = (row: R) => string;

export interface TableRootProps<R = _Row> {
  data?: R[];
  columns?: Column<R>[];
  getRowKey?: GetRowKey<R>;
  children?: React.ReactNode;
  visibilityState?: VisibilityState;
  onChange?: (value: VisibilityState, changedIdentifier: string) => void;
}

interface RootContext {
  data?: TableRootProps['data'];
  columns?: TableRootProps['columns'];
  visibilityState?: TableRootProps['visibilityState'];
  getRowKey?: TableRootProps['getRowKey'];
  setVisibilityState: UseControllableStateReturn<
    VisibilityState,
    string | null
  >[1];
}

const displayName = 'TableRoot';

const [TableCtx, useTableCtx] = createContextScope<RootContext>(displayName);

export { useTableCtx };

const TableRootImpl = (props: TableRootProps) => {
  const {
    columns: userColumns,
    data,
    children,
    getRowKey,
    onChange,
    visibilityState: visibilityStateProp,
  } = props;

  const [visibilityState, setVisibilityState] = useControllableState<
    Record<string, boolean>,
    string | null
  >({
    defaultValue: {},
    value: visibilityStateProp,
    onChange: (value, changed) => {
      if (!changed && changed !== null)
        throw new CustomError(
          'Autocomplete',
          'internal Error, reason is not defined',
        );

      if (changed) onChange?.(value, changed);
    },
  });

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

  return (
    <TableCtx
      data={data}
      columns={columns}
      visibilityState={visibilityState}
      getRowKey={getRowKey}
      setVisibilityState={setVisibilityState}
    >
      {children}
    </TableCtx>
  );
};

TableRootImpl.displayName = displayName;

export const TableRoot = TableRootImpl as <R>(
  props: TableRootProps<R>,
) => React.ReactNode;
