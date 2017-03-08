/**
 * Localized env config
 */
const nconf = require('nconf');

//set up
nconf.argv().env();

const config = {
  env: nconf.get('NODE_ENV') === 'production' ? 'production' : 'development'
};

module.exports = config;
