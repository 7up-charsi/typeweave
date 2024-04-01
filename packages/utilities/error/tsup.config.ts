import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  dts: true,
  clean: true,
  target: 'es2022',
  format: ['cjs', 'esm'],
});
