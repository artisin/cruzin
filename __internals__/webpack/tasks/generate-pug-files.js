const fs                = require('fs-extra');
const path              = require('path');
const _                 = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JSON5             = require('json5');
const colur             = require('colur');
const config            = require('./../../config.js');
const {getConfig}       = require('./../../helpers.js');

/**
 * Helper to check and merge env data into the root of an Object
 * @param  {obj} val -> object to be checked/merged
 * @return {obj}
 */
const checkEnvSetting = function (val) {
  const env = config.env;
  const opposite = env === 'production' ? 'development' : 'production';
  if (_.has(val, config.env)) {
    //merge into root and omit
    val = _.merge(_.omit(val, config.env), _.get(val, config.env));
  }
  //omit opposite env obj data if any
  return _.omit(val, opposite);
};

/**
 * Helpers to validate the data schema
 * @param  {str} options.key  -> data object key
 * @param  {obj} options.file -> data object
 * @return {bln}              -> the truth
 */
const validData = function ({key, file}) {
  if (!_.has(file, 'template')) {
    colur(`ERROR:pug -> config.yml ->
          Need to specify a template key/value pair for: "${key}" in pages Object`, {
            end: true
          });
    return false;
  }
  return true;
};


/**
 * Writes out manifest to keep track of html assets
 * @param  {str} filename -> [name].html
 * @param  {obj} options  -> options
 */
const writeManifest = function (filename, options) {
  const manifestPath = options.manifestPath;
  if (manifestPath) {
    //esure/create manifest file
    fs.createFileSync(manifestPath);
    //get and add html asset
    let data = fs.readFileSync(manifestPath, 'utf8');
    data = data.length ? data : {};
    let obj = data.length ? JSON.parse(data) : data;
    obj = _.defaultsDeep(obj, {[filename]: filename});
    //wright out
    const json = JSON.stringify(obj);
    fs.writeFileSync(manifestPath, json, 'utf8');
  }
};


/**
 * Adds the html files to the offlineplugin for production service workers
 * @param  {str} filename -> [name].html
 * @param  {obj} options  -> options
 * @return {obj}
 */
const updateOfflinePlugin = function (filename, options) {
  if (filename.includes('index') && _.has(options, 'offlinePlugin.caches.main')) {
    options.offlinePlugin.caches.main.push(filename);
  }else if (_.has(options, 'offlinePlugin.caches.additional')) {
    options.offlinePlugin.caches.additional.push(filename);
  }
  return options;
};


/**
 * Builds HtmlWepkackPlugin plugin data tmpl to be processed by the webpack.config.
 * The reason we need to build then template and not use a loader is becuase
 * we want to pass specific local data variables it specific pages
 * @param  {str} options.context    -> webpack context
 * @param  {str} options.pugContext -> pug contect as in the dir name
 * @param  {str} options.key        -> for assumed filename need be
 * @param  {obj} options.file       -> pug page config for specific page
 * @param  {obj} options.html       -> pug option.html config
 * @param  {obj} options.pug        -> pug option.pug object
 * @return {fnk}                    -> initilized HtmlWebpack plugin
 */
const htmlWebpackTmpl = function ({context, pugContext, key, file, html, pug, options}) {
  //need to use JSON5 to stringiy options passed to tmpl since the optiosn are
  //converted via webpack-utils in HtmlWebpackPlugin which used JSON5
  const pugOption = JSON5.stringify(_.cloneDeep(pug));
  const fileName = file.filename || `${key}.html`;
  //check for mainifext write
  if (_.get(options, 'manifest')) {
    writeManifest(fileName, options);
  }
  //update offlinePlugin need be
  if (config.env === 'production' && _.get(options, 'offlinePlugin.addHTML')) {
    options = updateOfflinePlugin(fileName, options);
  }
  //build the html template
  const tmpl = _.defaultsDeep(_.cloneDeep(html) || {}, {
    filename: fileName,
    prefetch: ['*.js', 'data.json'],
    preload: '*.*',
    template: `pug-loader?${pugOption}!${path.join(context, pugContext, file.template)}`
  });

  //->
  return {
    html: new HtmlWebpackPlugin(tmpl),
    offlinePlugin: options.offlinePlugin
  };
};

/**
 * Builds HtmlWepkackPlugin plugin data Array
 * @param  {str} context -> webpack context
 * @return {arr}         -> Array of inililized HtmlWebpack plugin's for pages
 */
const generatePugFiles = function ({context, options}) {
  //.cruzerc.yml config varibles
  const pluginConfig = getConfig('pug.config') || 'config.yml';
  const pugContext = getConfig('pug.dir') || 'pug';
  //get the config.yml data for pug
  const configPath = getConfig('pug.absolute')
                   ? pluginConfig
                   : path.join(context, pugContext, pluginConfig);

  //local config varibles
  let {html, pug} = getConfig('option', configPath);
  //check for enviroment specific options
  html = checkEnvSetting(html);
  pug = checkEnvSetting(pug);
  //gets the common data to be merged into local data
  const page = getConfig('page', configPath);
  if (!page || _.isEmpty(page)) {
    colur(`ERROR:pug -> config.yml ->
          No page Object found in the config.yml, nothing to process`, {
            error: true
          });
    return [];
  }

  //reduce and reuse in life, builds HtmlWebpack plugin templates
  const htmlPlugArray = _.reduce(page, function (prv, file, key) {
    if (validData({key, file})) {
      const res = htmlWebpackTmpl({context, pugContext, key, file, html, pug, options});
      //update offlpine plugin for return
      options.offlinePlugin = res.offlinePlugin;
      prv.push(res.html);
    }
    return prv;
  }, []);

  //->
  return {
    pugFiles: htmlPlugArray,
    offlinePlugin: options.offlinePlugin
  };
};


module.exports = generatePugFiles;

