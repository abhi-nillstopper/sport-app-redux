// const { defaults } = require("jest-config");

const config = {
  testEnvironment: "node",
  moduleFileExtensions: ["js"],

  testMatch: ["<rootDir>/src/server/spec/**/*.test.js"],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/server/**/*.js",
    "!src/client/**",
    "!src/server/index.js",
  ],
  coverageReporters: ["text", "json", "html", "lcov"],
};

module.exports = config;
