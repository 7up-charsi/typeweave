import React from 'react';
import { Slot } from '../slot';
import { useSelectRowCtx } from './table-select-row-root';

export interface TableSelectAllRowsProps {
  children?: React.ReactNode;
}

const Comp_Name = 'TableSelectAllRows';

export const TableSelectAllRows = (props: TableSelectAllRowsProps) => {
  const { children } = props;

  const ref = React.useRef<HTMLInputElement>(null);

  const { selected, setSelected, rows } = useSelectRowCtx(Comp_Name);

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

TableSelectAllRows.displayName = 'TableSelectAllRows';
