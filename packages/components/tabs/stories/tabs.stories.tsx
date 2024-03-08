import React from 'react';
import { tabs } from '@webbo-ui/theme';

import * as Tabs from '../src';

const meta = {
  title: 'Components/Tabs',
  args: tabs.defaultVariants,
};

export default meta;

const Template = () => (
  <Tabs.Root defaultValue="tab-3">
    <Tabs.List>
      <Tabs.Trigger value="tab-1">tab 1</Tabs.Trigger>
      <Tabs.Trigger value="tab-2">tab 2</Tabs.Trigger>
      <Tabs.Trigger value="tab-3">tab 3</Tabs.Trigger>
      <Tabs.Trigger value="tab-4">tab 4</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab-1">content 1</Tabs.Content>
    <Tabs.Content value="tab-2">content 2</Tabs.Content>
    <Tabs.Content value="tab-3">content 3</Tabs.Content>
    <Tabs.Content value="tab-4">content 4</Tabs.Content>
  </Tabs.Root>
);

export const Default = {
  render: Template,
};
