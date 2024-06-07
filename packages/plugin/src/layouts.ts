import { ThemeLayout } from './types';

const borderRadius = '4px';
const depthElevationShadow =
  'rgba(0, 0, 0, 0.2) 0px 15px 30px, rgba(0, 0, 0, 0.1) 0px 5px 15px, rgba(0, 0, 0, 0.05) 0px 2px 8px';

export const lightThemeLayout: Required<ThemeLayout> = {
  borderRadius,
  boxShadow: { depthElevation: depthElevationShadow },
};

export const darkThemeLayout: Required<ThemeLayout> = {
  borderRadius,
  boxShadow: { depthElevation: depthElevationShadow },
};
