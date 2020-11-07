module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(tsx?)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  clearMocks: true,
  restoreMocks: true,
  testMatch: ['**/*.spec.(js|ts)'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
