import { TableClassNames, TableVariantProps, table } from '@webbo-ui/theme';
import { useTableCtx } from './table-root';

export interface TableProps
  extends TableVariantProps,
    React.TableHTMLAttributes<HTMLTableElement> {
  classNames?: TableClassNames;
}

const Comp_Name = 'Table';

export const Table = (props: TableProps) => {
  const { classNames, className, variant = 'grid', ...restProps } = props;

  const { data, columns, getRowKey, visibilityState } = useTableCtx(Comp_Name);

  const styles = table({ variant });

  return (
    data &&
    columns && (
      <table
        {...restProps}
        className={styles.table({ className: classNames?.table ?? className })}
      >
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

Table.displayName = 'Table';
