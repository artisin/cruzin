/**
 * Cleans dir specifed in the .cruzerc.yml
 * config prop = clean: [dirs | files]
 */
const _           = require('lodash');
const shell       = require('shelljs');
const colur       = require('colur');
const del         = require('del');
const {getConfig} = require('./../helpers.js');


/**
 * Check for clean from config, and cycle clean
 */
const cleanConfig = function () {
  let clean = getConfig('tasks.clean.paths');
  if (clean) {
    clean = _.isArray(clean) ? clean : [clean];
    del(clean).then(function (paths) {
      colur(`SCRIPT:clean -> Cleaning: ${paths}`);
    });
    del.sync(clean);
  }else {
    colur('WARNING:::sripts/clean:-> No clean config property found in config!');
  }
};


/**
 * Need to have git before we can run, gotz to be safe.
 * Like my mom would say, safe sex is the best sex
 */
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  colur('ERROR:::sripts/clean:-> Sorry, the clean script requires git!');
  shell.exit(1);
}else {
  /**
   * Signal start, and start
   */
  colur('SCRIPT:clean -> Clean Complete', {end: true});
  cleanConfig();
  shell.exit(0);
}
