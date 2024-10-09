import { Options } from 'tsup';

export const tsupSharedConfig: Options = {
  clean: true,
  outDir: 'dist',
  experimentalDts: true,
  target: ['esnext'],
  format: 'esm',
};
