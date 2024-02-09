import React from 'react';
import { Preview, ReactRenderer } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

import './style.css';

const preview: Preview = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => {
      return (
        <div className="p-4">
          <Story />
        </div>
      );
    },
    withThemeByClassName<ReactRenderer>({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
