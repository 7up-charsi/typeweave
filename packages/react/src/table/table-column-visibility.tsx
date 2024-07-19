import React from 'react';
import { useTableCtx } from './table-root';

export interface TableColumnVisibilityProps {
  children?: (props: {
    columns: {
      title: string | null;
      visibility: boolean;
      toggleVisibility: () => void;
    }[];
  }) => React.ReactNode;
}

const displayName = 'TableColumnVisibility';

export const TableColumnVisibility = (props: TableColumnVisibilityProps) => {
  const { children } = props;

  const { columns, setColumnVisibility, data, columnVisibility } =
    useTableCtx(displayName);

  return children?.({
    columns: columns
      .filter((col) => col.hideable)
      .map((col) => {
        const header = col.header(data);

        return {
          title:
            col.visibilityTitle ?? (typeof header === 'string' ? header : null),

          visibility: !!columnVisibility[col.identifier],
          toggleVisibility: () => {
            setColumnVisibility((prev) => {
              const cols = { ...prev };
              cols[col.identifier] = !prev[col.identifier];

              return cols;
            });
          },
        };
      }),
  });
};

TableColumnVisibility.displayName = displayName;
