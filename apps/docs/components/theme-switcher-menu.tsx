'use client';

import {
  Button,
  MenuArrow,
  MenuContent,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from '@typeweave/react';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { ThemeProvider, useTheme } from 'next-themes';

interface ThemeSwitcherMenuProps {
  className?: string;
}

const ThemeImpl = (props: ThemeSwitcherMenuProps) => {
  const { className } = props;

  const { theme, setTheme } = useTheme();

  return (
    <MenuRoot>
      <MenuTrigger>
        <Button size="sm" className={className}>
          theme
        </Button>
      </MenuTrigger>

      <MenuPortal>
        <MenuContent className="z-[9999]">
          <MenuArrow />
          <MenuRadioGroup
            label="theme switcher"
            onChange={setTheme}
            value={theme ?? undefined}
          >
            <MenuRadioItem
              value="light"
              classNames={{ itemContent: 'flex justify-between' }}
            >
              <span>Light</span>
              <SunIcon size={20} />
            </MenuRadioItem>

            <MenuRadioItem
              value="dark"
              classNames={{ itemContent: 'flex justify-between' }}
            >
              <span>Dark</span>
              <MoonIcon size={20} />
            </MenuRadioItem>

            <MenuRadioItem
              value="system"
              classNames={{ itemContent: 'flex justify-between' }}
            >
              <span>System</span>
              <MonitorIcon size={20} />
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

export const ThemeSwitcherMenu = (props: ThemeSwitcherMenuProps) => {
  return (
    <ThemeProvider
      enableSystem
      enableColorScheme
      defaultTheme="light"
      themes={['light', 'dark']}
    >
      <ThemeImpl {...props} />
    </ThemeProvider>
  );
};
