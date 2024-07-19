export type ClassNames<Slots extends object> = {
  [key in keyof Slots]?: string;
};

export type ColorScale = Record<string, string>;

export type ThemeColors = Partial<{
  background: string;
  foreground: string;
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  danger: ColorScale;
  info: ColorScale;
  muted: ColorScale;
  overlay: string;
  focus: string;
  paper: string;
}>;

export type ThemeLayout = Partial<{
  borderRadius: string;
  boxShadow: {
    depthElevation?: string;
  };
}>;

export type Theme = Partial<{
  /** @default light */
  base: 'light' | 'dark';
  colors: ThemeColors;
  layout: ThemeLayout;
}>;

export type BaseThemes = Partial<{
  light: Omit<Theme, 'base'>;
  dark: Omit<Theme, 'base'>;
}>;

export type Themes = BaseThemes & Record<string, Theme>;

export type PluginConfig = Partial<{
  colorMode: 'rgb' | 'hsl';
  defaultTheme: string;
  defaultColors: Partial<{ light: ThemeColors; dark: ThemeColors }>;
  defaultLayout: Partial<{ light: ThemeLayout; dark: ThemeLayout }>;
  themes: Themes;
}>;
