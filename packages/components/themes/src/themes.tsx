'use client';

import { useMediaQuery } from '@webbo-ui/use-media-query';
import { createContextScope } from '@webbo-ui/context';
import { CustomError } from '@webbo-ui/error';
import { useLayoutEffect, useState } from 'react';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';

const ThemeProvider_Name = 'Themes.ThemeProvider';

export interface ThemeProviderProps {
  defaultTheme: string;
  dataAttribute?: false | string;
  children?: React.ReactNode;
  themeContainer?: HTMLElement;
  darkTheme?: string;
  lightTheme?: string;
  localStorageKey?: false | string;
}

interface ThemeProviderContext {
  theme?: string;
  onThemeChange: (theme: string) => void;
}

const [ThemeProviderProvider, useThemeProviderContext] =
  createContextScope<ThemeProviderContext>(ThemeProvider_Name);

export const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    children,
    defaultTheme,
    darkTheme = 'dark',
    lightTheme = 'light',
    themeContainer = globalThis?.document?.documentElement,
    dataAttribute = 'theme',
    localStorageKey = 'theme',
  } = props;

  const matched = useMediaQuery('(prefers-color-scheme: dark)');

  const [value, setValue] = useState(defaultTheme);

  const onThemeChange = useCallbackRef((theme: string) => {
    if (!theme)
      throw new CustomError(ThemeProvider_Name, '`theme` is required');

    if (value) themeContainer.classList.remove(value);
    if (dataAttribute) delete themeContainer.dataset[dataAttribute];

    const newTheme =
      theme === 'system' ? (matched ? darkTheme : lightTheme) : theme;

    themeContainer.classList.add(newTheme);
    if (dataAttribute) themeContainer.dataset[dataAttribute] = newTheme;

    setValue(theme);

    if (localStorageKey) localStorage.setItem(localStorageKey, theme);
  });

  useLayoutEffect(() => {
    onThemeChange(
      (localStorageKey ? localStorage.getItem(localStorageKey) : undefined) ??
        defaultTheme,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTheme, localStorageKey]);

  return (
    <ThemeProviderProvider theme={value} onThemeChange={onThemeChange}>
      {children}
    </ThemeProviderProvider>
  );
};

ThemeProvider.displayName = 'webbo-ui.' + ThemeProvider_Name;

// *-*-*-*-* useTheme *-*-*-*-*

const useTheme_Name = 'Themes.useTheme';

export const useTheme = () => {
  const rootContext = useThemeProviderContext(useTheme_Name);

  return {
    onThemeChange: rootContext.onThemeChange,
    theme: rootContext.theme,
  };
};

useTheme.displayName = 'webbo-ui.' + useTheme_Name;
