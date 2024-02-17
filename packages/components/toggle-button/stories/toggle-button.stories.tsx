import React, { useState } from 'react';
import { toggleButton } from '@webbo-ui/theme';

import { ToggleButton, ToggleButtonGroup } from '../src';

const meta = {
  title: 'Components/ToggleButton',
  args: toggleButton.defaultVariants,
};

export default meta;

const Template = () => {
  const [value, setValue] = useState(['update']);

  return (
    <ToggleButtonGroup value={value} onChange={(e) => setValue(e.target.value)}>
      <ToggleButton value="select">select</ToggleButton>
      <ToggleButton value="update">update</ToggleButton>
      <ToggleButton value="delete">delete</ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Default = {
  render: Template,
};
