const path = require('path')

module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': path.resolve(__dirname, 'src/$1'),
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['**/*.spec.(js|jsx|ts|tsx)'],
    testURL: 'http://localhost/',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx,vue}',
        '!src/main.ts',
        '!src/router.ts',
        '!**/node_modules/**',
    ],
};
