import { defineConfig, Options } from 'tsup';

const options: Options = {
  dts: true,
  clean: true,
  target: 'es2022',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
};

export default [
  defineConfig({
    ...options,
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
      './src/input',
      './src/menu',
      './src/overlay',
    ],
  }),
  defineConfig({
    ...options,
    entry: [
      './src/pagination',
      './src/popover',
      './src/popper',
      './src/radio',
      './src/select',
    ],
  }),
  defineConfig({
    ...options,
    entry: [
      './src/skeleton',
      './src/slot',
      './src/switch',
      './src/table',
      './src/tabs',
    ],
  }),
  defineConfig({
    ...options,
    entry: [
      './src/themes',
      './src/toggle-button',
      './src/tooltip',
      './src/use-callback-ref',
      './src/use-click-outside',
    ],
  }),
  defineConfig({
    ...options,
    entry: [
      './src/use-collection',
      './src/use-controllable-state',
      './src/use-is-disabled',
      './src/use-media-query',
      './src/use-pointer-events',
    ],
  }),
  defineConfig({
    ...options,
    entry: [
      './src/use-ripple',
      './src/use-scroll-lock',
      './src/use-size',
      './src/visually-hidden',
    ],
  }),
];
