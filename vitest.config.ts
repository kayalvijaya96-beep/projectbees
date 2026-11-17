import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/web'),
      '@projectbee/shared-types': path.resolve(__dirname, './packages/shared-types/src'),
      '@projectbee/ui': path.resolve(__dirname, './packages/ui/src'),
    },
  },
});

