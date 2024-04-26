export type {
  ClassProp as TailwindVariantsClassProp,
  ClassValue as TailwindVariantsClassValue,
} from 'tailwind-variants';

export type ClassNames<Slots extends object> = {
  [key in keyof Slots]?: string;
};
