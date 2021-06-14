// const { defaults } = require("jest-config");

const config = {
  setupFiles: ["<rootDir>/jest/setupTest.js", "<rootDir>/jest/setEnvVars.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "public"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/client/spec/__mocks__/styleMock.js",
    "\\.(svg)$": "<rootDir>/src/client/spec/__mocks__/svgMock.js",
  },
  // testMatch: ["<rootDir>/src/**/*.test.js", "<rootDir>/src/**/*.test.jsx"],
  testMatch: [
    "<rootDir>/src/client/spec/**/*.test.js",
    "<rootDir>/src/client/spec/**/*.test.jsx",
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/jest/svgTransform.js",
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  collectCoverage: true,
  collectCoverageFrom: ["src/client/**/*.js", "!src/server/index.js"],
  // collectCoverageFrom: ["src/**/*.js", "!src/server/index.js"],
  coverageReporters: ["text", "json", "html", "lcov"],
  setupFilesAfterEnv: ["<rootDir>/jest/afterSetup.js"],
  // setupFilesAfterEnv: ["jest-enzyme"],
  // testEnvironment: "enzyme",
  // testEnvironmentOptions: {
  //   enzymeAdapter: "react17",
  // },
};

module.exports = config;
