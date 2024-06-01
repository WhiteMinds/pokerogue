import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { serwist } from '@serwist/vite'

export const defaultConfig = {
  plugins: [
    tsconfigPaths() as any,
    serwist({
      swSrc: 'src/sw.ts',
      swDest: 'sw.js',
      globDirectory: 'dist',
      // globPatterns: ['public/*'],
      // globPatterns: ['**/*.{js,css,html,png,webmanifest,json,mp3}'],
      injectionPoint: 'self.__SW_MANIFEST',
      rollupFormat: 'iife',
    }),
  ],
  server: { host: '0.0.0.0', port: 8000 },
  clearScreen: false,
  build: {
    minify: 'esbuild' as const,
    sourcemap: false,
  },
  rollupOptions: {
    onwarn(warning, warn) {
      // Suppress "Module level directives cause errors when bundled" warnings
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    },
  },
}

export default defineConfig(({ mode }) => ({
  ...defaultConfig,
  esbuild: {
    pure: mode === 'production' ? ['console.log'] : [],
    keepNames: true,
  },
}))
