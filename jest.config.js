module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^react-router-dom$': require.resolve('react-router-dom'),
    '^@mui/material$': require.resolve('@mui/material'),
    '^@mui/icons-material$': require.resolve('@mui/icons-material'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-router-dom|@mui)/)',
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};