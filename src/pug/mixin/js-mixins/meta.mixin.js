const _ = require('lodash');

const meta = function (val) {
  return !_.isPlainObject(val) ? val : _.defaultsDeep(val, {rel: 'stylesheet'});
};

module.exports = meta;
