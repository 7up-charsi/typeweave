import React from 'react';

import { ThemeProvider, useTheme } from './';
import * as Menu from '../menu';
import { Button, ButtonGroup } from '../button';

const meta = {
  title: 'Components/Themes',
};

export default meta;

const light_svg = (
  <svg fill="none" viewBox="0 0 24 24" width={17} height={17}>
    <g>
      <path fill="transparent" d="M0 0H24V24H0z"></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 12a4 4 0 118 0 4 4 0 01-8 0zM12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM19.707 4.293a1 1 0 010 1.414l-2 2a1 1 0 11-1.414-1.414l2-2a1 1 0 011.414 0zM18 12a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM16.293 16.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM12 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM7.707 16.293a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414l2-2a1 1 0 011.414 0zM2 12a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zM4.293 4.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </g>
  </svg>
);

const dark_svg = (
  <svg fill="none" viewBox="0 0 24 24" width={17} height={17}>
    <path
      fill="currentColor"
      d="M21.529 15.93c-.16-.27-.61-.69-1.73-.49-.62.11-1.25.16-1.88.13a8.41 8.41 0 01-5.91-2.82c-1.3-1.45-2.1-3.34-2.11-5.38 0-1.14.22-2.24.67-3.28.44-1.01.13-1.54-.09-1.76-.23-.23-.77-.55-1.83-.11-4.09 1.72-6.62 5.82-6.32 10.21.3 4.13 3.2 7.66 7.04 8.99a10 10 0 002.89.55c.16.01.32.02.48.02 3.35 0 6.49-1.58 8.47-4.27.67-.93.49-1.52.32-1.79z"
    ></path>
  </svg>
);

const system_svg = (
  <svg fill="none" viewBox="0 0 24 24" width={17} height={17}>
    <g fill="currentColor">
      <path d="M17.56 17.97H6.44c-3.98 0-5.19-1.21-5.19-5.19V6.44c0-3.98 1.21-5.19 5.19-5.19h11.11c3.98 0 5.19 1.21 5.19 5.19v6.33c.01 3.99-1.2 5.2-5.18 5.2zM6.44 2.75c-3.14 0-3.69.55-3.69 3.69v6.33c0 3.14.55 3.69 3.69 3.69h11.11c3.14 0 3.69-.55 3.69-3.69V6.44c0-3.14-.55-3.69-3.69-3.69H6.44z"></path>
      <path d="M12 22.75c-.41 0-.75-.34-.75-.75v-4.78c0-.41.34-.75.75-.75s.75.34.75.75V22c0 .41-.34.75-.75.75zM22 13.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75z"></path>
      <path d="M16.5 22.75h-9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9c.41 0 .75.34.75.75s-.34.75-.75.75z"></path>
    </g>
  </svg>
);

const MenuThemeComp = () => {
  const { onThemeChange, theme } = useTheme();

  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button>theme</Button>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Menu>
          <Menu.Arrow />
          <Menu.RadioGroup
            label="theme switcher"
            onChange={onThemeChange}
            value={theme ?? undefined}
          >
            <Menu.RadioItem
              value="light"
              classNames={{
                itemContent: 'flex items-center justify-between pr-3',
              }}
            >
              <span>Light</span> {light_svg}
            </Menu.RadioItem>
            <Menu.RadioItem
              value="dark"
              classNames={{
                itemContent: 'flex items-center justify-between pr-3',
              }}
            >
              <span>Dark</span> {dark_svg}
            </Menu.RadioItem>
            <Menu.RadioItem
              value="system"
              classNames={{
                itemContent: 'flex items-center justify-between pr-3',
              }}
            >
              <span>System</span> {system_svg}
            </Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Menu>
      </Menu.Portal>
    </Menu.Root>
  );
};

const MenuTemplate = () => (
  <ThemeProvider defaultTheme="light">
    <MenuThemeComp />
  </ThemeProvider>
);

export const MenuThemes = {
  render: MenuTemplate,
};

const ButtonThemeSwitcher = () => {
  const { onThemeChange } = useTheme();

  return (
    <ButtonGroup>
      <Button
        isIconOnly
        aria-label="light theme"
        onPress={() => onThemeChange('light')}
      >
        {light_svg}
      </Button>
      <Button
        isIconOnly
        aria-label="dark theme"
        onPress={() => onThemeChange('dark')}
      >
        {dark_svg}
      </Button>
      <Button
        isIconOnly
        aria-label="system theme"
        onPress={() => onThemeChange('system')}
      >
        {system_svg}
      </Button>
    </ButtonGroup>
  );
};

const ButtonsTemplate = () => (
  <ThemeProvider defaultTheme="light">
    <ButtonThemeSwitcher />
  </ThemeProvider>
);

export const ButtonsThemes = {
  render: ButtonsTemplate,
};
