#!/usr/bin/env node
/**
 * Init setup script
 */
const shell = require('shelljs');
const colur = require('colur');

/**
 * dels git
 */
const cleanGit = function () {
  colur('SCRIPT:init -> Cleaning out git');
  shell.rm('-rf', '.git/');
};

/**
 * inits git
 */
const initGit = function () {
  colur('SCRIPT:init -> Git init');
  shell.exec('git init && git add . && git commit -m "Initial commit"');
};

/**
 * Installs deps
 */
const installDeps = function () {
  colur('SCRIPT:init -> Installing dependencies... hang tight!');
  //node check
  shell.exec('node --version', function (err, stdout) {
    const nodeVersion = stdout && parseFloat(stdout.substring(1));
    if (nodeVersion < 5 || err) {
      colur('SCRIPT:init -> ERROR -> Need to have node version 5 or higher, update and try again', {error: true});
    }else if (!shell.which('yarn')) {
      //default to npm
      shell.exec('npm install', function () {
        //signal comp
        colur('SCRIPT:init -> Complete! Time to cruze!', {end: true});
      });
    }else {
      //yarn globally install on user
      shell.exec('yarn install', function () {
        //signal comp
        colur('SCRIPT:init -> Complete! Time to cruze!', {end: true});
      });
    }
  });
};


/**
 * Caller
 */
colur('SCRIPT:init -> Setting up project...');
cleanGit();
initGit();
installDeps();
