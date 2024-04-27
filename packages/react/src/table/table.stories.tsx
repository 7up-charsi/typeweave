import React from 'react';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import {
  TableRoot,
  TableSelectAllRows,
  TableSelectRow,
  TableColumnVisibility,
  TableSelectRowRoot,
  Table,
} from './';
import { Columns3Icon } from 'lucide-react';

const meta = {
  title: 'Components/Table',
};

export default meta;

const Template = () => {
  const selectedRows = React.useRef<Record<string, string>>({});

  return (
    <TableRoot
      getRowKey={(row) => row.id}
      data={Array.from({ length: 25 }).map((_, i) => ({ id: i + '' }))}
      columns={[
        {
          accessor: (row) => row.id,
          header: (data) => (
            <div className="flex items-center justify-center">
              <TableSelectAllRows>
                <Checkbox
                  onChange={(e) => {
                    const checked = e.target.checked;

                    if (checked)
                      selectedRows.current = data.reduce(
                        (acc, ele) => ((acc[ele.id] = true), acc),
                        {},
                      );
                    else selectedRows.current = {};
                  }}
                />
              </TableSelectAllRows>
            </div>
          ),
          identifier: 'select-row',
          cell: (val) => (
            <div className="flex items-center justify-center">
              <TableSelectRow>
                <Checkbox
                  onChange={(e) => {
                    const checked = e.target.checked;
                    selectedRows.current[val] = checked;
                  }}
                />
              </TableSelectRow>
            </div>
          ),
          visibilityTitle: 'select',
        },
        ...Array.from({ length: 8 }).map((_, i) => ({
          accessor: () => `${i + 1}`,
          header: () => `column ${i + 1}`,
          identifier: `${i + 1}`,
        })),
      ]}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="text-muted-11 font-medium">Data table</span>
          <span className="grow"></span>

          <TableColumnVisibility tableIdentifier="demo_table">
            <Button isIconOnly aria-label="column visibility">
              <Columns3Icon />
            </Button>
          </TableColumnVisibility>
        </div>

        <TableSelectRowRoot>
          <Table variant="strip" />
        </TableSelectRowRoot>
      </div>
    </TableRoot>
  );
};

export const Default = {
  render: Template,
};
