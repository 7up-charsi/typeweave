export type {
  ClassProp as TailwindVariantsClassProp,
  ClassValue as TailwindVariantsClassValue,
} from 'tailwind-variants';

export type ClassNames<Slots extends object> = {
  [key in keyof Slots]?: string;
};

export type ColorScale = Record<string, string>;

export type ThemeColors = {
  background?: string;
  foreground?: string;
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
  info?: ColorScale;
  muted?: ColorScale;
  overlay?: string;
  focus?: string;
  paper?: string;
};

export type ThemeLayout = {
  borderRadius?: string;
};

export type Theme = {
  base?: 'light' | 'dark';
  colors?: ThemeColors;
  layout?: ThemeLayout;
};

export type Themes = Record<string, Theme>;

export type PluginConfig = {
  defaultTheme?: string;
  themes?: Themes;
};
