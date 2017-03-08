//external style assets
require('./../styl/main.styl');

console.log('init');
//require additional assets, loaded async
require.ensure([], function(require) {
  require('./lib/intercooler.js');
  require('./events/_index.js');
});
