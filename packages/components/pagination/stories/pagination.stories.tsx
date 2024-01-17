import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { pagination } from '@gist-ui/theme';

import { Pagination, PaginationProps } from '../src';

const meta: Meta<PaginationProps> = {
  title: 'Components/Pagination',
  component: Pagination,
  args: pagination.defaultVariants,
};

export default meta;

const Template = (args: PaginationProps) => <Pagination {...args} />;

export const Default: StoryObj<PaginationProps> = {
  render: Template,
};
