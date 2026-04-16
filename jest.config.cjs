module.exports = {
    collectCoverageFrom: [
        '!**/__tests__/**',
        '!**/*.mocks.js',
        'src/**/*.js'
    ],
    moduleDirectories: [
        'node_modules'
    ],
    moduleFileExtensions: [
        'js'
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/dist/'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/spec/tests.config.js'
    ],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\.html$': 'jest-raw-loader',
        '^.+\.jsx?$': ['@swc/jest']
    },
    testEnvironmentOptions: {
        url: 'http://localhost/'
    },
    automock: false,
    setupFiles: [
        './spec/fetchMock.js'
    ]
};
