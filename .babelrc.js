module.exports = {
  presets: [
    '@babel/typescript',
    '@babel/react',
    ['@babel/env', { targets: { node: 'current' } }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
};

