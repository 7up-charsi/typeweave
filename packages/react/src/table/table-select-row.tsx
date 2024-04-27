import React from 'react';
import { useSelectRowCtx } from './table-select-row-root';
import { Slot } from '../slot';

export interface TableSelectRowProps {
  children?: React.ReactNode;
}

const displayName = 'TableSelectRow';

export const TableSelectRow = (props: TableSelectRowProps) => {
  const { children } = props;
  const { selected, setSelected, rows } = useSelectRowCtx(displayName);

  const identifier = React.useId();

  React.useEffect(() => {
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

TableSelectRow.displayName = displayName;
