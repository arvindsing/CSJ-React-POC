import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  // React + browser code
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['service-layer/**/*'], // exclude backend from browser rules
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Node backend (service-layer)
  {
    files: ['service-layer/**/*.js'],
    languageOptions: {
      globals: globals.node, // enables process, __dirname, etc.
    },
    extends: [
      js.configs.recommended,
    ],
  },
])

