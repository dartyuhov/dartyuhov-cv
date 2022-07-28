module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    'react-spring': '<rootDir>/node_modules/react-spring/web.cjs',
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageThreshold: {
    global: {
      lines: 90,
      funcs: 90,
    },
  },
  testMatch: ['<rootDir>/src/**/*.spec.tsx?'],
};
