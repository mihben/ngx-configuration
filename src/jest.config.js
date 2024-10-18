module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
