'use client';

import { useMediaQuery } from '@webbo-ui/use-media-query';
import { createContextScope } from '@webbo-ui/context';
import { CustomError } from '@webbo-ui/error';
import { useLayoutEffect, useRef, useState } from 'react';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';

const ThemeProvider_Name = 'Themes.ThemeProvider';

export interface ThemeProviderProps {
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

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(ThemeProvider_Name);

export const ThemeProvider = (props: ThemeProviderProps) => {
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

  const [value, setValue] = useState<string | null>(null);

  const prevTheme = useRef('');

  const onThemeChange = useCallbackRef((theme: string) => {
    if (!theme)
      throw new CustomError(ThemeProvider_Name, '`theme` is required');

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
  });

  useLayoutEffect(() => {
    onThemeChange(
      (localStorageKey ? localStorage.getItem(localStorageKey) : undefined) ??
        defaultTheme,
    );
  }, [defaultTheme, localStorageKey, onThemeChange]);

  return (
    <RootProvider theme={value} onThemeChange={onThemeChange}>
      {children}
    </RootProvider>
  );
};

ThemeProvider.displayName = 'webbo-ui.' + ThemeProvider_Name;

// *-*-*-*-* useTheme *-*-*-*-*

const useTheme_Name = 'Themes.useTheme';

export const useTheme = () => {
  const rootContext = useRootContext(useTheme_Name);

  return {
    onThemeChange: rootContext.onThemeChange,
    theme: rootContext.theme,
  };
};

useTheme.displayName = 'webbo-ui.' + useTheme_Name;
