import React from 'react';
import { table } from '@gist-ui/theme';
import { Button } from '@gist-ui/button';

import * as Table from '../src';

const meta = {
  title: 'Components/Table',
  args: table.defaultVariants,
};

export default meta;

const Template = () => {
  return (
    <Table.Root
      data={Array.from({ length: 25 }).map((_, i) => ({ id: i + '' }))}
      columns={Array.from({ length: 8 }).map((_, i) => ({
        accessor: () => `${i + 1}`,
        header: () => `column ${i + 1}`,
        identifier: `${i + 1}`,
      }))}
      getRowKey={(row) => row.id}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="text-neutral-700 font-medium">Data table</span>
          <span className="grow"></span>

          <Table.ColumnVisibility>
            <Button isIconOnly>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                viewBox="0 0 24 24"
                width={20}
                height={20}
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

        <Table.Table />
      </div>
    </Table.Root>
  );
};

export const Default = {
  render: Template,
};
