module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json', // tsconfig.json 파일의 경로를 지정합니다.
    tsconfigRootDir: __dirname, // TypeScript 프로젝트의 최상위 디렉토리를 지정합니다.
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'], //절대경로 설정
      },
    },
  },
  rules: {
    // eslint에서 recomment하는것 이외에 적용시킬 rules
    'no-unused-vars': 'error',
    'import/no-unresolved': 'error',
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': [
      'off',
      {
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
  },
}
