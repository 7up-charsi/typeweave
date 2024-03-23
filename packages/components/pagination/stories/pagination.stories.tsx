import React from 'react';
import { pagination } from '@webbo-ui/theme';
import { Pagination, PaginationProps } from '../src';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: pagination.defaultVariants,
};

export default meta;

const Template = (args: PaginationProps) => <Pagination {...args} />;

export const Default = {
  render: Template,
};
