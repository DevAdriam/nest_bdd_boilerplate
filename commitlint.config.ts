module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'debug',
        'fix',
        'chore',
        'docs',
        'style',
        'refactor',
        'test',
        'build',
        'ci',
        'perf',
      ],
    ],
    'scope-enum': [2, 'always', ['infra', 'auth', 'core', 'ui', 'app']],
    'subject-case': [0, 'never'],
    'subject-empty': [2, 'never'],
  },
};
