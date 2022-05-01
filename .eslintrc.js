module.exports = {
  extends: "erb",
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "error",
    // Since React 17 and typescript 4.1 you can safely disable the rule
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "no-plusplus": "off",
    "no-restricted-syntax": [
      "off",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "prefer-destructuring": "off",
    "import/no-named-as-default-member": "off",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    "import/resolver": {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve("./.erb/configs/webpack.config.eslint.ts"),
      },
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
};
