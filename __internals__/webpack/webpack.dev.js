/**
 * DEV WEBPACK CONFIGURATION
 * - Merge into webpack.base.js
 */
const path              = require('path');
const _                 = require('lodash');
const webpack           = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const {getConfig}       = require('./../helpers.js');


/**
 * Configs the devemplet webpack specific config
 * @return {obj}
 */
const configDev = function () {
  //configures dev output path, since the path needs to be configed beforhand
  const devDir = getConfig('webpack.development.output.path') || 'build';
  const devPath = path.join(process.cwd(), devDir);
  //default in the .cruzinrc.yml -> webpack.development Object config
  const devConfig = _.defaultsDeep({
    output: {path: devPath}
  }, _.omit(getConfig('webpack.development'), 'plugins') || {}, {
    output: {
      // Don't use hashes in dev mode for better performance
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    }
  });

  /**
   * Hardwired dev config the rest are preconfiged in the .cruzinrc.yml
   */
  const dev = _.defaultsDeep(devConfig, {
    // Add development plugins
    plugins: [
      new webpack.NoEmitOnErrorsPlugin()
    ]
  });

  //check for browsersync
  const browserPlugin = getConfig('webpack.development.plugins.BrowserSyncPlugin');
  if (_.isPlainObject(browserPlugin)) {
    dev.plugins.push(new BrowserSyncPlugin(_.defaultsDeep(browserPlugin, {
      host: 'localhost',
      port: 3000,
      server: { baseDir: [devConfig.output.path] }
    })));
  }

  //>
  return dev;
};

module.exports = require('./webpack.base.js')(configDev());
