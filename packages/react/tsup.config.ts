import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src', '!src/**/*.stories.tsx'],
  target: 'es2022',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
  dts: true,
  clean: true,
});
