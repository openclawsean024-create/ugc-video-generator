// ESLint 9 flat config — ugc-video-generator repair cycle 2 (2026-09-28)
// Source of truth: node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md
// This repo uses Next.js 16 + TypeScript + `eslint-config-next` 16.2.4.
// The base `eslint-config-next` config already includes the `next/typescript` block
// for `.ts/.tsx` files, so we only need to spread `core-web-vitals` and add the
// project-wide globalIgnores (matches Next docs default).
//
// Bounded intentionally:
//   - No rule overrides (no @next/next/* disabling)
//   - No new dependencies (eslint + eslint-config-next already in package.json)
//   - No scripts / package.json / lockfile / PRD / app/** touched
//
// Reference: https://nextjs.org/docs/app/api-reference/config/eslint#setup-eslint

import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
