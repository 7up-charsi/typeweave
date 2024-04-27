import { useThemesCtx } from './themes-root';

const Comp_Name = 'useTheme';

export const useTheme = () => {
  const rootContext = useThemesCtx(Comp_Name);

  return {
    onThemeChange: rootContext.onThemeChange,
    theme: rootContext.theme,
  };
};
