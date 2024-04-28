import React from 'react';
import {
  ThemesRoot,
  useTheme,
  Button,
  ButtonGroup,
  MenuArrow,
  MenuContent,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from '../src';
import { Monitor, Moon, Sun } from 'lucide-react';

const meta = {
  title: 'Components/Themes',
};

export default meta;

const MenuThemeComp = () => {
  const { onThemeChange, theme } = useTheme();

  return (
    <MenuRoot>
      <MenuTrigger>
        <Button>theme</Button>
      </MenuTrigger>

      <MenuPortal>
        <MenuContent>
          <MenuArrow />

          <MenuRadioGroup
            hideLabel
            label="theme switcher"
            onChange={onThemeChange}
            value={theme ?? undefined}
          >
            <MenuRadioItem
              value="light"
              classNames={{
                itemContent: 'flex items-center justify-between pr-3',
              }}
            >
              <span>Light</span> <Sun />
            </MenuRadioItem>
            <MenuRadioItem
              value="dark"
              classNames={{
                itemContent: 'flex items-center justify-between pr-3',
              }}
            >
              <span>Dark</span>
              <Moon />
            </MenuRadioItem>
            <MenuRadioItem
              value="system"
              classNames={{
                itemContent: 'flex items-center justify-between pr-3',
              }}
            >
              <span>System</span>
              <Monitor />
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

const MenuTemplate = () => (
  <ThemesRoot defaultTheme="light">
    <MenuThemeComp />
  </ThemesRoot>
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
        <Sun />
      </Button>
      <Button
        isIconOnly
        aria-label="dark theme"
        onPress={() => onThemeChange('dark')}
      >
        <Moon />
      </Button>
      <Button
        isIconOnly
        aria-label="system theme"
        onPress={() => onThemeChange('system')}
      >
        <Monitor />
      </Button>
    </ButtonGroup>
  );
};

const ButtonsTemplate = () => (
  <ThemesRoot defaultTheme="light">
    <ButtonThemeSwitcher />
  </ThemesRoot>
);

export const ButtonsThemes = {
  render: ButtonsTemplate,
};
