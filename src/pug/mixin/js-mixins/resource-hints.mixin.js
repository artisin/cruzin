const _       = require('lodash');
const getData = require('./get-data.mixin.js');

/**
 * Adds resource hints based on config setup
 * @param  {obj} src  -> script attribute object
 * @param  {str} page -> if specific page
 * @param  {str} type -> if specific type of resource
 * @return {obj}
 */
/**
 * [resourceHints description]
 * @param  {obj} val    -> obj to add hints to
 * @param  {str} key    -> lookup resource
 * @param  {str} page   -> specific config object to search
 * @param  {str} type   -> link || script
 * @return {obj}
 */
const resourceHints = function ({val, key, page, type}) {
  //config name schema, if indv page we need to prefix
  page = page === 'common' ? page : ('page.' + page);
  //check if hints are present
  const resource = getData(`${page}.resource-hints`);
  if (_.isObject(resource) && !_.isEmpty(resource)) {
    //cycle resources and check for regex matches
    _.forEach(resource, function (resMatch) {
      if (type === _.get(resMatch, 'type')) {
        const match = _.get(resMatch, 'match');
        if (match) {
          //test regex, if match, merge in hints to be procsess by pug
          const reg = new RegExp(match);
          if (val[key] && reg.test(val[key])) {
            const hints = _.get(resMatch, 'hints') || {};
            val = _.defaultsDeep(val, hints);
          }
        }
      }
    });
  }
  return val;
};

module.exports = resourceHints;
