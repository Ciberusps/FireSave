module.exports = {
  extends: ["next", "prettier", "jest", "plugin:react-hooks/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
};
