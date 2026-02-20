export default [
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 6,
            sourceType: 'module'
        },
        rules: {
            'no-unused-expressions': 'error',
            'no-unused-vars': ['error', { caughtErrors: 'none' }],
            'semi': 'error',
            'indent': ['error', 4],
            'spaced-comment': ['error', 'always'],
            'multiline-comment-style': ['error', 'starred-block'],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'quotes': ['error', 'single', { allowTemplateLiterals: true }]
        }
    }
];
