import React from 'react';
import { createContextScope } from '../context';

export interface TableSelectRowRootProps {
  children?: React.ReactNode;
}

interface SelectRowCtxProps {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  rows: React.MutableRefObject<string[]>;
}

const Comp_Name = 'TableSelectRowRoot';

const [SelectRowCtx, useSelectRowCtx] =
  createContextScope<SelectRowCtxProps>(Comp_Name);

export { useSelectRowCtx };

export const TableSelectRowRoot = (props: TableSelectRowRootProps) => {
  const { children } = props;

  const rows = React.useRef<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <SelectRowCtx selected={selected} setSelected={setSelected} rows={rows}>
      {children}
    </SelectRowCtx>
  );
};

TableSelectRowRoot.displayName = 'TableSelectRowRoot';
