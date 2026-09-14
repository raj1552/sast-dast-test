const nextJest = require('next/jest');

// next/jest automatically configures the SWC transform Next.js already
// uses, so JSX/TS in test files works without needing a separate Babel setup
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
