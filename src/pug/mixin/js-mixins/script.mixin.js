const _     = require('lodash');
const hints = require('./resource-hints.mixin.js');

const script = function (val, page = 'common') {
  if (_.isPlainObject(val)) {
    val = hints({
      key: 'src',
      type: 'script',
      val,
      page
    });
    return _.defaultsDeep(val, {type: 'text/javascript'});
  }
  return val;
};

module.exports = script;
