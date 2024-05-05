import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  target: 'es2022',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
  dts: true,
  clean: true,
});
