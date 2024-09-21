import React from 'react';
import { Pagination, PaginationProps } from './';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
};

export default meta;

const Template = (args: PaginationProps) => <Pagination {...args} />;

export const Default = {
  render: Template,
};
