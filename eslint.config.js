import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // react-three-fiber's core idioms trip several React-Compiler-oriented
    // rules that assume plain DOM/state components:
    //  - immutability: useFrame mutates renderer-owned objects (camera,
    //    scene, materials) every frame — that callback runs outside React's
    //    render phase, so this isn't a render-phase mutation even though the
    //    values originated from useThree()/useRef().
    //  - purity: procedural scene generation seeds itself with Math.random()
    //    inside useMemo, deliberately once per dependency change — the
    //    standard way to build a stable particle field.
    //  - refs: passing a ref-held Vector3/Color as a prop default (instead of
    //    reallocating one every render) is the recommended way to avoid
    //    per-frame GC churn in three.js scenes.
    files: ['src/three/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
    },
  },
])
