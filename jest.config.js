module.exports = {
    testEnvironment: 'node',
    transform: {
        "^.+\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        '<rootDir>/**/__tests__/**/*.test.ts?(x)'
    ],
    collectCoverageFrom: [
        '**/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/__tests__/**',
        '!**/__mocks__/**'
    ],
    coverageDirectory: './__coverage__',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        "ts-jest": {
            "diagnostics": {
                warnOnly: true
            }
        }
    }
}
