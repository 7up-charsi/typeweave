import { defineConfig, Options } from 'tsup';

const options: Options = {
  dts: true,
  target: 'es2022',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
};

export default [
  defineConfig({
    ...options,
    clean: true,
    entry: [
      './src/accordion',
      './src/alert',
      './src/alert-dialog',
      './src/autocomplete',
      './src/badge',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/button',
      './src/checkbox',
      './src/chip',
      './src/context',
      './src/dialog',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/disclosure',
      './src/focus-trap',
      './src/index.ts',
      './src/input',
      './src/menu',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/overlay',
      './src/pagination',
      './src/popover',
      './src/popper',
      './src/radio',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/select',
      './src/skeleton',
      './src/slot',
      './src/switch',
      './src/table',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/tabs',
      './src/themes',
      './src/toggle-button',
      './src/tooltip',
      './src/use-callback-ref',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/use-click-outside',
      './src/use-collection',
      './src/use-controllable-state',
      './src/use-is-disabled',
      './src/use-media-query',
    ],
  }),
  defineConfig({
    ...options,

    entry: [
      './src/use-pointer-events',
      './src/use-ripple',
      './src/use-scroll-lock',
      './src/use-size',
      './src/visually-hidden',
    ],
  }),
];
