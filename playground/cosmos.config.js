module.exports = {
  rootPath: '../',

  fileMatch: ['**/fixtures/**/*.{ts,tsx}'],
  watchDirs: ['src', 'playground'],

  // We don't want to include the proxy in other cases because
  // it would overlap the components that make it.
  exclude: process.env.RCPB_ACCEPTANCE ? [] : [/fixtures\/playground/],
  proxiesPath: process.env.RCPB_ACCEPTANCE
    ? 'playground/cosmos.proxies.js'
    : 'something invalid',

  webpackConfigPath: 'webpack.config.js',

  hostname: '0.0.0.0',
  port: 8989
};
