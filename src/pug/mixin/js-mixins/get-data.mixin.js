const _     = require('lodash');
const fs    = require('fs');
const yaml  = require('js-yaml');

/**
 * Checks if that shit exists yo
 * @param  {str} filePath -> file path to check
 * @return {bln}          -> the word of truth
 */
const fileExists = function (filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }catch (err) {
    return false;
  }
};


/**
 * Gets the yaml config for the whole show
 * @param  {str} get      -> path to get
 * @param  {str} filePath -> config path
 * @return {---}          -> obj | bln
 */
const getData = function (get = false, filePath = './src/pug/config.yml') {
  //saftey check
  if (!fileExists(filePath)) {
    console.error(`ERROR:::getData:-> Config not found, path: ${filePath}`);
    return {};
  }
  try {
    const config = yaml.load(fs.readFileSync(filePath, 'utf8'));
    if (!get) { return config; }
    //check if there is an data object to get
    if (_.has(config, `${get}.data`)) { return _.get(config, `${get}.data`); }
    if (_.has(config, get)) { return _.get(config, get); }
    if (get !== false) {
      console.error(`ERROR:::getData:-> Cound not get the "${get}" path from: ${filePath}`);
    }
    //return whoe config object
    return config;
  } catch (e) {
    console.error(e);
    return {};
  }
};


module.exports = getData;


