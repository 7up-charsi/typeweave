import { useThemesCtx } from './themes-root';

const displayName = 'useTheme';

export const useTheme = () => {
  const rootContext = useThemesCtx(displayName);

  return {
    onThemeChange: rootContext.onThemeChange,
    theme: rootContext.theme,
  };
};
