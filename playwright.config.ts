import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const desktopViewport = { width: 1920, height: 1080 };
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests/',
  snapshotDir: './tests/__snapshots__',
  timeout: 25000,
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
      scale: 'css',
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : 4,
  reporter: [['html', { open: 'never' }]],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: desktopViewport,
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: desktopViewport,
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: desktopViewport,
      },
    },

    // TODO add mobile tests
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

  ],

  use: {
    actionTimeout: 10000,
    screenshot: 'only-on-failure',
    headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
    baseURL: 'http://localhost:3000/',

  },

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/',
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
