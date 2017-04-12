/**
 * COMMON WEBPACK CONFIGURATION
 */
const path              = require('path');
const webpack           = require('webpack');
const _                 = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferPlugin    = require('transfer-webpack-plugin');
const AssetsManifest    = require('webpack-assets-manifest');
const autoprefixer      = require('autoprefixer');
const FaviconsPlugin    = require('favicons-webpack-plugin');
const BundleAnyzPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const genPugFiles       = require('./tasks/generate-pug-files.js');
const OfflinePlugin     = require('offline-plugin');
const CTR               = require('ctr').stylus;
const {getConfig, env}  = require('./../helpers.js');
const enviroment        = env.get();
const ctr               = new CTR();


const configBase = function (options = {}) {
  const production = enviroment === 'production';
  //config the base context
  const baseContextDir = getConfig('webpack.base.context') || 'src';
  const baseContext = path.join(process.cwd(), baseContextDir);
  //css extract file name
  let cssExtract = getConfig('webpack.base.plugins.ExtractTextPlugin.filename') || '[name].css';
  cssExtract = _.isFunction(cssExtract) ? cssExtract(env) : cssExtract;

  //gets/sets base configuration
  const baseConfig = _.defaultsDeep(options, {
    context: baseContext
  }, _.omit(getConfig('webpack.base'), 'plugins') || {}, {
    entry: {
      app: './js/index.js'
    },
    resolve: {
      modules: ['node_modules']
    },
    // Make web variables accessible to webpack, e.g. window
    target: 'web'
  });

  //we lookup here in case addHTML is in setting
  let offlinePlugin = getConfig('webpack.production.plugins.OfflinePlugin') || {};
  // gen pug files
  const manifestPath = path.join(baseConfig.output.path, 'manifest.json');
  const results = genPugFiles({
    context: baseContextDir,
    options: {
      manifestPath,
      manifest: true,
      offlinePlugin
    }
  });
  //update from the return
  const {pugFiles} = results;
  ({offlinePlugin} = results);

  /**
   * Hardwired dev config the rest are preconfiged in the .cruzinrc.yml
   */
  const base = _.defaultsDeep(_.omit(baseConfig, 'plugins'), {
    module: {
      rules: [{
        // Transform all .js files required somewhere with Babel
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        /**
         * Fonts
         */
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: production ? '[name]-[sha512:hash:base64:7].[ext]' : '[name].[ext]'
        }
      }, {
        /**
         * For pug mixins and includes which have to use this prefix
         * otherwise they get picked up my HtmlWebpackPlugin and as
         * a result they will not work as expected
         */
        test: /.(\.include|\.mixin|\.component|\.icon)\.pug$/,
        loader: 'pug-loader'
      }, {
        /**
         * Image handler + compresses images
         */
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: production ? '[name]-[sha512:hash:base64:7].[ext]' : '[name].[ext]',
            limit: 1000
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }, {
        /**
         * Stylus, autoprefixer + ctr
         */
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              root: '.',
              name: production ? '[name].[hash].css' : '[name].css',
              minimize: production
            }
          }, {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer({ browsers: ['last 4 versions'] })] }
          }, {
            /**
             * @note currently ctr is being pulled in via LoaderOptionsPlugin
             * in the plugins since if ctr is defined her it will log out
             * all kinds of internal stylus garbage. This should be resolved in
             * the near future, although, the mode of action remains the same
             * @type {String}
             */
            loader: 'stylus-loader'
          }]
        })
      }]
    },
    plugins: _.union(baseConfig.plugins || [], pugFiles, [
      /**
       * Tells the stylus-loader we wish to use ctr
       * @type {Object}
       */
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            use: [ctr]
          }
        }
      }),
      /**
       * Compiles ours styles in a seperate stylesheet
       */
      new ExtractTextPlugin({
        filename: cssExtract,
        allChunks: true
      }),
      /**
       * Builds mainfest, for server workers
       */
      new AssetsManifest({
        output: 'manifest.json',
        replacer: null,
        space: 2,
        writeToDisk: true,
        fileExtRegex: /\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,
        sortManifest: true,
        merge: true,
        publicPath: ''
      }),
      /**
       * Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
       * inside your code for any environment checks; UglifyJS will automatically
       * drop any unreachable code.
       */
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(enviroment)
        }
      }),
      /**
       * displays file name rather than nums
       */
      new webpack.NamedModulesPlugin()
    ])
  });

  //check for ProvidePlugin
  const providePlugin = getConfig('webpack.base.plugins.ProvidePlugin');
  if (_.isPlainObject(providePlugin)) {
    base.plugins.push(new webpack.ProvidePlugin(providePlugin));
  }
  //check for TransferPlugin
  const transfer = getConfig('webpack.base.plugins.TransferWebpackPlugin');
  if (_.isPlainObject(transfer)) {
    base.plugins.push(new TransferPlugin([transfer], baseContext));
  }
  //check for favicon
  const favicon = getConfig('webpack.base.plugins.FaviconsWebpackPlugin');
  if (_.isPlainObject(favicon)) {
    base.plugins.push(new FaviconsPlugin(favicon));
  }
  //check for bundle analyzer
  const bundlePlugin = getConfig('webpack.base.plugins.BundleAnalyzerPlugin');
  if (_.isPlainObject(bundlePlugin)) {
    base.plugins.push(new BundleAnyzPlugin(bundlePlugin));
  }
  //checks for offline plugin, only during production
  if (production && _.isPlainObject(offlinePlugin)) {
    base.plugins.push(new OfflinePlugin(_.omit(offlinePlugin, 'addHTML')));
  }

  //>
  return base;
};

module.exports = configBase;

