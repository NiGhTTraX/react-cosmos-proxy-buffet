module.exports = {
  'root': true,

  'parser': 'typescript-eslint-parser',

  'plugins': [
    'typescript'
  ],

  'extends': [
    '@nighttrax'
  ],

  'settings': {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js', '.ts', '.tsx'
        ]
      },
      'babel-module': { }
    }
  },

  'rules': {
    // ESLint doesn't understand interfaces yet and marks them as undefined.
    'no-undef': 0,

    'typescript/no-unused-vars': 2,

    'react/sort-comp': [2, {
      order: [
        'statics',
        'static-methods',
        'instance-variables',
        'instance-methods',
        'defaultProps',
        'state',
        'constructor',
        'render',
        '/^_render.+$/', // any auxiliary _render methods
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount',
        '/^on[A-Z].+$/', // event handlers
        'everything-else',
        '/^_.+$/' // private methods
      ]
    }],
  }
};
