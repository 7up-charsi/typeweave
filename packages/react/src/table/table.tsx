import { useTableCtx } from './table-root';
import React from 'react';
import { TableVariantProps, tableStyles } from './table.styles';

export interface TableProps
  extends TableVariantProps,
    React.TableHTMLAttributes<HTMLTableElement> {
  classNames?: Partial<{
    table: string;
    thead: string;
    tbody: string;
    tr: string;
    th: string;
    td: string;
  }>;
}

const displayName = 'Table';

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const { classNames, className, variant = 'grid', ...restProps } = props;

    const { data, columns, getRowKey, columnVisibility } =
      useTableCtx(displayName);

    const styles = React.useMemo(() => tableStyles({ variant }), [variant]);

    return (
      <table
        {...restProps}
        ref={ref}
        className={styles.table({
          className: classNames?.table ?? className,
        })}
      >
        <thead className={styles.thead({ className: classNames?.thead })}>
          <tr className={styles.tr({ className: classNames?.tr })}>
            {columns.map((col) => {
              const visible =
                columnVisibility[col.identifier] ?? col.visibility;

              if (!visible) return;

              return (
                <th
                  key={col.identifier}
                  className={styles.th({
                    className: col.classNames?.th ?? classNames?.th,
                  })}
                >
                  {typeof col.header === 'function'
                    ? col.header(data)
                    : col.header}
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
              {columns.map((col) => {
                const visible =
                  columnVisibility[col.identifier] ?? col.visibility;

                if (!visible) return;

                const tdValue = col.accessor
                  ? col.accessor
                      .split('.')
                      .reduce((acc, curr) => acc[curr] as never, row)
                  : '';

                return (
                  <td
                    key={col.identifier}
                    className={styles.td({
                      className: col.classNames?.td ?? classNames?.td,
                    })}
                  >
                    {col.cell
                      ? col.accessor
                        ? col.cell(tdValue, row, data)
                        : (
                            col as {
                              cell: (
                                _row: typeof row,
                                data: (typeof row)[],
                              ) => React.ReactNode;
                            }
                          ).cell(row, data)
                      : null}

                    {!col.cell ? renderer(tdValue) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);

Table.displayName = displayName;

const renderer = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return '[object, object]';
};
