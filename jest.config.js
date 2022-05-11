/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testURL: "http://localhost/",
  testEnvironment: "jsdom",
  transform: {
    "\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/.erb/mocks/fileMock.js",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  moduleDirectories: ["node_modules", "release/app/node_modules"],
  testPathIgnorePatterns: ["release/app/dist", "node_modules"],
  setupFiles: ["./.erb/scripts/check-build-exists.ts"],
};
