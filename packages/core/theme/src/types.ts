import { ClassValue } from 'tailwind-variants';

export type ClassNames<Slots extends object> = {
  [key in keyof Slots]?: ClassValue;
};
