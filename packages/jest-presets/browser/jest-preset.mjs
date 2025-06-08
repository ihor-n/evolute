/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/test/__fixtures__', '<rootDir>/node_modules', '<rootDir>/dist'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}

export default config
