'use client';

import {
  MenuArrow,
  MenuContent,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from '@typeweave/react/menu';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import React from 'react';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeImpl = (props: ThemeSwitcherProps) => {
  const { className } = props;

  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <Skeleton variant="rounded" className="mr-5 h-9 w-20" />;

  return (
    <MenuRoot>
      <MenuTrigger>
        <Button className={className}>theme</Button>
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

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
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
