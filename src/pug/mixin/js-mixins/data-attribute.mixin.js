const _ = require('lodash');

const data = function (obj, pre = false) {
  return !_.isPlainObject(obj) ? {} : _.reduce(obj, function (prv, val, key) {
    key = pre ? `data-${pre}-${key}` : `data-${key}`;
    prv[key] = val;
    return prv;
  }, {});
};

module.exports = data;
