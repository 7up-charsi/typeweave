import { Options } from 'tsup';

export const tsupSharedConfig: Options = {
  clean: true,
  outDir: 'dist',
  experimentalDts: true,
  entry: ['./src/**'],
  target: ['esnext'],
  format: 'esm',
};
