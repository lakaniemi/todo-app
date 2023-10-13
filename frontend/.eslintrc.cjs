module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "prettier/prettier": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // "React" import not needed with new React versions
    "react/react-in-jsx-scope": "off",
    // I personally like to avoid default exports unless it makes sense
    "import/prefer-default-export": "off",
    // Purely stylistic choice, I prefer arrow functions
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    // Prefer types over interfaces
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    // Prop-types not really relevant with TS
    "react/prop-types": "off",
    // Group imports for more clarity
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "type", "external"],
          ["internal", "parent", "sibling", "index"],
          "object",
        ],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
    // Add exception for immer, allows reassign when using on "state" variable
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] },
    ],
  },
};
