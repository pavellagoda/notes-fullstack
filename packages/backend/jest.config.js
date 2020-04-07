const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = {
  testMatch: [`<rootDir>/**/*/*.spec.ts?(x)`],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.jest.json',
      diagnostics: false,
    },
  },

  transform: {
    ...tsjPreset.transform,
  },

  transformIgnorePatterns: ['dist/'],
};
