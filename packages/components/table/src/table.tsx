'use client';

import { createContextScope } from '@webbo-ui/context';
import { TableClassNames, TableVariantProps, table } from '@webbo-ui/theme';
import * as Menu from '@webbo-ui/menu';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CustomError } from '@webbo-ui/error';
import { Slot } from '@webbo-ui/slot';
import {
  UseControllableStateReturn,
  useControllableState,
} from '@webbo-ui/use-controllable-state';

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

// ********** ROOT **********

const Root_Name = 'Table.Root';

export interface RootProps<R = _Row> {
  data?: R[];
  columns?: Column<R>[];
  getRowKey?: GetRowKey<R>;
  children?: React.ReactNode;
  visibilityState?: VisibilityState;
  onChange?: (value: VisibilityState, changedIdentifier: string) => void;
}

interface RootContext {
  data?: RootProps['data'];
  columns?: RootProps['columns'];
  visibilityState?: RootProps['visibilityState'];
  getRowKey?: RootProps['getRowKey'];
  setVisibilityState: UseControllableStateReturn<
    VisibilityState,
    string | null
  >[1];
}

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(Root_Name);

const RootImp = (props: RootProps) => {
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

  const columns = useMemo(
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
    <RootProvider
      data={data}
      columns={columns}
      visibilityState={visibilityState}
      getRowKey={getRowKey}
      setVisibilityState={setVisibilityState}
    >
      {children}
    </RootProvider>
  );
};

RootImp.displayName = 'webbo-ui.' + Root_Name;

export const Root = RootImp as <R>(props: RootProps<R>) => React.ReactNode;

// ********** Table **********

const Table_Name = 'Table.Table';

export interface TableProps extends TableVariantProps {
  classNames?: TableClassNames;
}

export const Table = (props: TableProps) => {
  const { classNames, variant = 'grid' } = props;

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
              const visible = visibilityState?.[identifier] ?? visibility;

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
              key={getRowKey?.(row) ?? i}
            >
              {columns.map(({ accessor, cell, identifier, visibility }) => {
                const visible = visibilityState?.[identifier] ?? visibility;

                const tdValue = accessor(row);

                return !visible ? undefined : (
                  <td
                    className={styles.td({ className: classNames?.td })}
                    key={identifier}
                  >
                    {cell
                      ? cell(tdValue, row, data)
                      : typeof tdValue === 'string' ||
                          typeof tdValue === 'number'
                        ? tdValue
                        : '[object, object]'}
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

Table.displayName = 'webbo-ui.' + Table_Name;

// ********** ColumnVisibility **********

const ColumnVisibility_Name = 'Table.ColumnVisibility';

export interface ColumnVisibilityProps
  extends Omit<Menu.MenuProps, 'className' | 'roleDescription'> {
  children?: React.ReactNode;
  tableIdentifier?: string;
  onChange?: (identifier: string, visibility: boolean) => void;
  classNames?: {
    menu?: string;
    checkboxItem?: Menu.CheckboxItemProps['classNames'];
  };
}

export const ColumnVisibility = (props: ColumnVisibilityProps) => {
  const { children, classNames, onChange, tableIdentifier, ...menuProps } =
    props;

  const { columns, data, setVisibilityState, visibilityState } = useRootContext(
    ColumnVisibility_Name,
  );

  useEffect(() => {
    if (tableIdentifier) {
      setVisibilityState(
        JSON.parse(localStorage.getItem(tableIdentifier) ?? `{}`),
        null,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableIdentifier]);

  return (
    <Menu.Root>
      <Menu.Trigger a11yLabel="open table column visibility">
        {children}
      </Menu.Trigger>
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

              const checked = visibilityState?.[identifier] ?? visibility;

              return (
                <Menu.CheckboxItem
                  key={i}
                  checked={checked}
                  classNames={classNames?.checkboxItem}
                  onChange={(checked) => {
                    if (onChange) onChange(identifier, checked);
                    if (!onChange && tableIdentifier) {
                      localStorage.setItem(
                        tableIdentifier,
                        JSON.stringify({
                          ...visibilityState,
                          [identifier]: checked,
                        }),
                      );
                    }

                    setVisibilityState(
                      (prev) => ({ ...prev, [identifier]: checked }),
                      identifier,
                    );
                  }}
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

ColumnVisibility.displayName = 'webbo-ui.' + ColumnVisibility_Name;

// ********** SelectRowProvider **********

const SelectRowProvider_Name = 'Table.SelectRow';

interface SelectRowContext {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  rows: React.MutableRefObject<string[]>;
}

const [SelectRowContextProvider, useSelectRowContext] =
  createContextScope<SelectRowContext>(SelectRowProvider_Name);

export interface SelectRowProviderProps {
  children: React.ReactNode;
}

export const SelectRowProvider = (props: SelectRowProviderProps) => {
  const { children } = props;

  const rows = useRef<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <SelectRowContextProvider
      selected={selected}
      setSelected={setSelected}
      rows={rows}
    >
      {children}
    </SelectRowContextProvider>
  );
};

SelectRowProvider.displayName = 'webbo-ui.' + SelectRowProvider_Name;

// ********** SelectAllRows **********

const SelectAllRows_Name = 'Table.SelectAllRows';

export interface SelectAllRowsProps {
  children: React.ReactNode;
}

export const SelectAllRows = (props: SelectAllRowsProps) => {
  const { children } = props;

  const ref = useRef<HTMLInputElement>(null);

  const { selected, setSelected, rows } =
    useSelectRowContext(SelectAllRows_Name);

  return (
    <Slot<
      HTMLInputElement,
      React.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }
    >
      ref={ref}
      checked={!!(selected.length && selected.length === rows.current.length)}
      onChange={(event: { target: { checked: boolean } }) => {
        setSelected(event.target.checked ? rows.current : []);
      }}
      indeterminate={
        !!(selected.length && selected.length !== rows.current.length)
      }
    >
      {children}
    </Slot>
  );
};

SelectAllRows.displayName = 'webbo-ui.' + SelectAllRows_Name;

// ********** SelectRow **********

const SelectRow_Name = 'Table.SelectRow';

export interface SelectRowProps {
  children: React.ReactNode;
}

export const SelectRow = (props: SelectRowProps) => {
  const { children } = props;
  const { selected, setSelected, rows } = useSelectRowContext(SelectRow_Name);

  const identifier = useId();

  useEffect(() => {
    rows.current.push(identifier);

    return () => {
      rows.current = rows.current.filter((ele) => ele !== identifier);
    };
  }, [identifier, rows]);

  return (
    <Slot<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>
      checked={selected.includes(identifier)}
      onChange={(event: { target: { checked: boolean } }) => {
        setSelected((prev) =>
          event.target.checked
            ? [...prev, identifier]
            : prev.filter((ele) => ele !== identifier),
        );
      }}
    >
      {children}
    </Slot>
  );
};

SelectRow.displayName = 'webbo-ui.' + SelectRow_Name;
