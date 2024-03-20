import React, { useRef } from 'react';
import { table } from '@webbo-ui/theme';
import { Button } from '@webbo-ui/button';
import { Checkbox } from '@webbo-ui/checkbox';

import * as Table from '../src';

const meta = {
  title: 'Components/Table',
  args: table.defaultVariants,
};

export default meta;

const Template = () => {
  const selectedRows = useRef({});

  return (
    <Table.Root
      getRowKey={(row) => row.id}
      data={Array.from({ length: 25 }).map((_, i) => ({ id: i + '' }))}
      columns={[
        {
          accessor: (row) => row.id,
          header: (data) => (
            <div className="flex items-center justify-center">
              <Table.SelectAllRows>
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
              </Table.SelectAllRows>
            </div>
          ),
          identifier: 'select-row',
          cell: (val) => (
            <div className="flex items-center justify-center">
              <Table.SelectRow>
                <Checkbox
                  onChange={(e) => {
                    const checked = e.target.checked;
                    selectedRows.current[val] = checked;
                  }}
                />
              </Table.SelectRow>
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

          <Table.ColumnVisibility tableIdentifier="demo_table">
            <Button isIconOnly aria-label="column visibility">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <g>
                  <rect width="18" height="18" x="3" y="3" rx="0"></rect>
                  <path d="M9 3L9 21"></path>
                  <path d="M15 3L15 21"></path>
                </g>
              </svg>
            </Button>
          </Table.ColumnVisibility>
        </div>

        <Table.SelectRowProvider>
          <Table.Table variant="strip" />
        </Table.SelectRowProvider>
      </div>
    </Table.Root>
  );
};

export const Default = {
  render: Template,
};
