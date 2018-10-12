module.exports = {
  rootPath: '../',

  ...(process.env.acceptance ? {
    fileMatch: ['**/fixtures/playground/**/*.{ts,tsx}']
  } : {
    fileMatch: ['**/fixtures/src/**/*.{ts,tsx}']
  }),

  watchDirs: ['src', 'playground'],
  exclude: [/\.d\.ts$/],

  globalImports: ['playground/styles.less'],
  proxiesPath: 'playground/cosmos.proxies.js',
  webpackConfigPath: 'webpack.config.js',

  hostname: '0.0.0.0',
  port: 8989
};
