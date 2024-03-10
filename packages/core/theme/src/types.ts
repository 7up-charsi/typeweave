export type ClassNames<Slots extends object> = {
  [key in keyof Slots]?: string;
};
