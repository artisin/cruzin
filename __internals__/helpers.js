const _     = require('lodash');
const fs    = require('fs');
const path  = require('path');
const colur = require('colur');
const yaml  = require('js-yaml');
const nconf = require('nconf');

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
 * Helper to get the current enviroment context
 * @return {obj}
 */
const env = {
  get: function () {
    nconf.argv().env();
    return nconf.get('NODE_ENV');
  }
};




/**
 * Gets the yaml config for the whole show
 * @param  {str} get      -> path to get
 * @param  {str} filePath -> config path
 * @return {---}          -> obj | bln
 */
const getConfig = function (get = false, filePath = '.cruzinrc.yml') {
  filePath = path.resolve(process.cwd(), filePath);
  //saftey check
  if (!fileExists(filePath)) {
    colur(`ERROR:::getConfig:-> Config not found, path: ${filePath}`);
    return get ? false : {};
  }
  try {
    const config = yaml.load(fs.readFileSync(filePath, 'utf8'));
    return get ? _.get(config, get) : config;
  } catch (e) {
    console.error(e);
    return {};
  }
};

module.exports = {
  fileExists,
  getConfig,
  env
};
