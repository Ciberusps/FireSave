module.exports = {
  extends: ["next", "prettier"],
  plugins: ["jest", "react-hooks"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
};
