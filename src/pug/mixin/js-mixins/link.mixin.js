const _     = require('lodash');
const hints = require('./resource-hints.mixin.js');

const link = function (val, page = 'common') {
  if (_.isPlainObject(val)) {
    val = hints({
      type: 'link',
      key: 'href',
      val,
      page
    });
    return _.defaultsDeep(val, {rel: 'stylesheet'});
  }
  return val;
};


module.exports = link;
