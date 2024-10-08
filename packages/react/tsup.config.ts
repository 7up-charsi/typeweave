import { defineConfig } from 'tsup';
import { tsupSharedConfig } from '../../shared_tsup.config';

export default defineConfig({
  ...tsupSharedConfig,
  banner: {
    js: '"use client";',
  },
});
