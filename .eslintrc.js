module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'standard-with-typescript',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:prettier/recommended'
    ],
    overrides: [
      {
        env: {
          node: true
        },
        files: [
          '.eslintrc.{js,cjs}'
        ],
        parserOptions: {
          sourceType: 'script'
        }
      }
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
    ignorePatterns: [
      'build/',
      'public/,',
      '**/node_modules/',
      '*.config.js',
      '.*lintrc.js',
      '/*.*'
    ],
  }