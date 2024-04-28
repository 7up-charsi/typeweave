import React from 'react';
import { createContextScope } from '../context';
import { useMediaQuery } from '../use-media-query';

export interface ThemesRootProps {
  defaultTheme?: string;
  dataAttribute?: false | string;
  children?: React.ReactNode;
  themeContainer?: HTMLElement;
  darkTheme?: string;
  lightTheme?: string;
  localStorageKey?: false | string;
}

interface RootContext {
  theme: string | null;
  onThemeChange: (theme: string) => void;
}

const displayName = 'ThemesRoot';

const [ThemesCtx, useThemesCtx] = createContextScope<RootContext>(displayName);

export { useThemesCtx };

export const ThemesRoot = (props: ThemesRootProps) => {
  const {
    children,
    defaultTheme = 'system',
    darkTheme = 'dark',
    lightTheme = 'light',
    themeContainer = globalThis?.document?.documentElement,
    dataAttribute = 'theme',
    localStorageKey = 'theme',
  } = props;

  const matched = useMediaQuery('(prefers-color-scheme: dark)');

  const [value, setValue] = React.useState<string | null>(null);

  const prevTheme = React.useRef('');

  const onThemeChange = React.useCallback(
    (theme: string) => {
      if (!theme) throw new Error(`${displayName}, \`theme\` is required`);

      if (prevTheme.current) themeContainer.classList.remove(prevTheme.current);
      if (prevTheme.current && dataAttribute)
        delete themeContainer.dataset[dataAttribute];

      const newTheme =
        theme === 'system' ? (matched ? darkTheme : lightTheme) : theme;

      themeContainer.classList.add(newTheme);
      if (dataAttribute) themeContainer.dataset[dataAttribute] = newTheme;

      prevTheme.current = newTheme;

      setValue(theme);
      if (localStorageKey) localStorage.setItem(localStorageKey, theme);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkTheme, dataAttribute, lightTheme, localStorageKey, matched],
  );

  React.useLayoutEffect(() => {
    onThemeChange(
      (localStorageKey ? localStorage.getItem(localStorageKey) : undefined) ??
        defaultTheme,
    );
  }, [defaultTheme, localStorageKey, onThemeChange]);

  return (
    <ThemesCtx theme={value} onThemeChange={onThemeChange}>
      {children}
    </ThemesCtx>
  );
};

ThemesRoot.displayName = displayName;
