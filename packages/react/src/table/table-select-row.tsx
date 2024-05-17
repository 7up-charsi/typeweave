import React from 'react';
import { useTableSelectRowCtx } from './table-select-row-root';
import { Slot } from '../slot';
import { useTableSelectAllRowCtx } from './table-select-all-rows';

export interface TableSelectRowProps {
  children?: React.ReactNode;
  identifier: string;
}

const displayName = 'TableSelectRow';

export const TableSelectRow = (props: TableSelectRowProps) => {
  const { children, identifier } = props;

  const { rows, selectedRows, setSelectedRows } =
    useTableSelectRowCtx(displayName);

  const { setRerenderSelectAll } = useTableSelectAllRowCtx(displayName);

  const identifierRef = React.useRef({});

  React.useEffect(() => {
    const exists = rows.has(identifierRef);

    // setting it false does not do any action but only i want to rerender select all comp.
    if (!exists) setRerenderSelectAll(false);

    rows.set(identifierRef, identifier);

    return () => {
      rows.delete(identifierRef);
      setSelectedRows((prev) =>
        prev.filter((rowIdentifier) => rowIdentifier !== identifier),
      );
    };
  }, [identifier, rows, setRerenderSelectAll, setSelectedRows]);

  return (
    <Slot<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>
      checked={selectedRows.includes(identifier)}
      onChange={(event) => {
        setSelectedRows((prev) =>
          event.target.checked
            ? [...prev, identifier]
            : prev.filter((rowIdentifier) => rowIdentifier !== identifier),
        );
      }}
    >
      {children}
    </Slot>
  );
};

TableSelectRow.displayName = displayName;
