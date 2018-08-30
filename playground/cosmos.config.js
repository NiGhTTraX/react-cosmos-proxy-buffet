module.exports = {
  rootPath: '../',

  fileMatch: ['**/fixtures/**/*.{ts,tsx}'],
  watchDirs: ['src', 'playground'],

  proxiesPath: 'playground/cosmos.proxies.js',
  webpackConfigPath: 'webpack.config.js',

  hostname: '0.0.0.0',
  port: 8989
};
