// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection

import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      include: [
        'test/unit/**/*.{test,spec}.ts',
        'test/**/*.unit.{test,spec}.ts',
      ],
      name: 'unit',
      environment: 'node',
    },
  },
  {
    test: {
      include: [
        'test/browser/**/*.{test,spec}.ts',
        'test/**/*.browser.{test,spec}.ts',
      ],
      name: 'browser',
      browser: {
        provider: "webdriverio",
        headless: true,
        enabled: true,
        name: "firefox",
      },
    },
  },
])