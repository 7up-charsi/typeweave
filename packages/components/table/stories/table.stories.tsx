import React from 'react';
import { table } from '@gist-ui/theme';

import * as Table from '../src';

const meta = {
  title: 'Components/Table',
  args: table.defaultVariants,
};

export default meta;

const Template = () => (
  <Table.Root
    data={Array.from({ length: 50 }).map((_, i) => ({
      id: i + '',
      name: i + 1,
      age: i + 1,
      home: i + 1,
      work: i + 1,
    }))}
    columns={[
      { accessor: (row) => row.name, header: () => 'name', identifier: 'name' },
      { accessor: (row) => row.age, header: () => 'age', identifier: 'age' },
      { accessor: (row) => row.home, header: () => 'home', identifier: 'home' },
      { accessor: (row) => row.work, header: () => 'work', identifier: 'work' },
      {
        accessor: (row) => row.name,
        header: () => 'name',
        identifier: 'name 2',
      },
      { accessor: (row) => row.age, header: () => 'age', identifier: 'age 2' },
      {
        accessor: (row) => row.home,
        header: () => 'home',
        identifier: 'home 2',
        hideable: false,
      },
      {
        accessor: (row) => row.work,
        header: () => 'work',
        identifier: 'work 2',
      },
    ]}
    getRowKey={(row) => row.id}
  >
    <Table.ColumnVisibility>
      <button>ColumnVisibility</button>
    </Table.ColumnVisibility>
    <Table.Table />
  </Table.Root>
);

export const Default = {
  render: Template,
};
