module.exports = {
  extends: ["next", "prettier"],
  plugins: ["jest", "react-hooks"],
  rules: {
    "@next/next/no-img-element": "off",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
};
