/**
 * DEV WEBPACK CONFIGURATION
 * - Merge into webpack.base.js
 */
const path                = require('path');
const _                   = require('lodash');
const webpack             = require('webpack');
const CompressionPlugin   = require('compression-webpack-plugin');
const {getConfig}         = require('./../helpers.js');


/**
 * Configs the devemplet webpack specific config
 * @return {obj}
 */
const configProd = function () {
  //configures prod output path, since the path needs to be configed beforhand
  const prodDir = getConfig('webpack.production.output.path') || 'www';
  const prodPath = path.join(process.cwd(), prodDir);

  //default in the .cruzerc.yml -> webpack.production Object config
  const devConfig = _.defaultsDeep({
    output: {path: prodPath}
  }, _.omit(getConfig('webpack.production'), 'plugins') || {}, {
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].chunk.js'
    }
  });

  /**
   * Hardwire prod config the rest are preconfiged in the .cruzerc.yml
   */
  const prod = _.defaultsDeep(devConfig, {
    // Add development plugins
    plugins: [
      // OccurrenceOrderPlugin is needed for long-term caching to work properly.
      // See http://mxs.is/googmv
      new webpack.optimize.OccurrenceOrderPlugin(true)
    ]
  });

  //check for Uglify
  const uglifyPlugin = getConfig('webpack.production.plugins.UglifyJsPlugin');
  if (_.isPlainObject(uglifyPlugin)) {
    prod.plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyPlugin));
  }
  //check for CompressionPlugin
  const compressPlugin = getConfig('webpack.production.plugins.CompressionPlugin');
  if (_.isPlainObject(compressPlugin)) {
    prod.plugins.push(new CompressionPlugin(compressPlugin));
  }
  //NOTE: offline plugin configed in base

  //>
  return prod;
};

module.exports = require('./webpack.base.js')(configProd());
