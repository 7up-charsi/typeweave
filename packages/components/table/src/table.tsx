import { createContextScope } from '@gist-ui/context';
import { TableClassNames, TableVariantProps, table } from '@gist-ui/theme';
import * as Menu from '@gist-ui/menu';
import { useMemo, useState } from 'react';
import { useCallbackRef } from '@gist-ui/use-callback-ref';

type Column<Row> = {
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

type GetRowKey<R> = (row: R) => string;
type _Row = Record<string, string>;
type VisibilityState = { identifier: string; visibility: boolean }[];

// ********** ROOT **********

const Root_Name = 'Table.Root';

interface RootContext {
  data?: _Row[];
  columns?: Column<_Row>[];
  visibilityState?: VisibilityState;
  getRowKey: GetRowKey<_Row>;
  onVisibilityChange: (identifier: string, visibility: boolean) => void;
}

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(Root_Name);

export interface RootProps<R> {
  data?: R[];
  columns?: Column<R>[];
  getRowKey?: GetRowKey<R>;
  children?: React.ReactNode;
}

export const Root = <R,>(props: RootProps<R>) => {
  const {
    columns: userColumns,
    data,
    children,
    getRowKey = (row) => (row as Record<string, string>).id,
  } = props;

  const [visibilityState, setVisibilityState] = useState<VisibilityState>([]);

  const onVisibilityChange = useCallbackRef(
    (identifier: string, visibility: boolean) => {
      setVisibilityState((prev) => [
        ...prev.filter((ele) => ele.identifier !== identifier),
        { identifier, visibility },
      ]);
    },
  );

  const columns = useMemo(
    () =>
      userColumns?.map((ele) => ({
        ...ele,
        visibility: ele.visibility ?? true,
        hideable: ele.hideable ?? true,
      })),
    [userColumns],
  );

  return (
    <RootProvider
      data={data as RootContext['data']}
      columns={columns as RootContext['columns']}
      visibilityState={visibilityState}
      getRowKey={getRowKey as RootContext['getRowKey']}
      onVisibilityChange={onVisibilityChange}
    >
      {children}
    </RootProvider>
  );
};

Root.displayName = 'gist-ui.' + Root_Name;

// ********** Table **********

const Table_Name = 'Table.Table';

export interface TableProps extends TableVariantProps {
  classNames?: TableClassNames;
}

export const Table = (props: TableProps) => {
  const { classNames, variant } = props;

  const { data, columns, getRowKey, visibilityState } =
    useRootContext(Table_Name);

  const styles = table({ variant });

  return (
    data &&
    columns && (
      <table className={styles.table({ className: classNames?.table })}>
        <thead className={styles.thead({ className: classNames?.thead })}>
          <tr className={styles.tr({ className: classNames?.tr })}>
            {columns?.map(({ header, identifier, visibility }) => {
              const visible =
                visibilityState?.find((ele) => ele.identifier === identifier)
                  ?.visibility ?? visibility;

              return !visible ? undefined : (
                <th
                  className={styles.th({ className: classNames?.th })}
                  key={identifier}
                >
                  {typeof header === 'function' ? header(data) : header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              className={styles.tr({ className: classNames?.tr })}
              key={getRowKey(row) ?? i}
            >
              {columns.map(({ accessor, cell, identifier, visibility }) => {
                const visible =
                  visibilityState?.find((ele) => ele.identifier === identifier)
                    ?.visibility ?? visibility;

                return !visible ? undefined : (
                  <td
                    className={styles.td({ className: classNames?.td })}
                    key={identifier}
                  >
                    {cell ? cell(accessor(row), row, data) : accessor(row)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

Table.displayName = 'gist-ui.' + Table_Name;

// ********** ColumnVisibility **********

const ColumnVisibility_Name = 'Table.ColumnVisibility';

export interface ColumnVisibilityProps
  extends Omit<Menu.MenuProps, 'className' | 'roleDescription'> {
  children?: React.ReactNode;
  classNames?: {
    menu?: string;
    checkboxItem?: string;
  };
}

export const ColumnVisibility = (props: ColumnVisibilityProps) => {
  const { children, classNames, ...menuProps } = props;

  const { columns, data, onVisibilityChange, visibilityState } = useRootContext(
    ColumnVisibility_Name,
  );

  return (
    <Menu.Root>
      <Menu.Trigger>{children}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Menu
          roleDescription="toggle table column visibility"
          {...menuProps}
          className={classNames?.menu}
        >
          <Menu.Arrow />

          {columns &&
            data &&
            columns.map((column, i) => {
              const {
                header,
                visibilityTitle,
                visibility,
                hideable,
                identifier,
              } = column;

              if (!hideable) return;

              const headerValue = header(data);

              const val =
                typeof headerValue === 'string' ? headerValue : visibilityTitle;

              const checked =
                visibilityState?.find((ele) => ele.identifier === identifier)
                  ?.visibility ?? visibility;

              return (
                <Menu.CheckboxItem
                  key={i}
                  checked={checked}
                  onChange={() => onVisibilityChange(identifier, !checked)}
                  className={classNames?.checkboxItem}
                >
                  {val ? val[0].toUpperCase() + val.slice(1) : ''}
                </Menu.CheckboxItem>
              );
            })}
        </Menu.Menu>
      </Menu.Portal>
    </Menu.Root>
  );
};

ColumnVisibility.displayName = 'gist-ui.' + ColumnVisibility_Name;
