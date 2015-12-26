'use strict';

const path = require('path');
const co = require('co');
const getTask = require('./lib/getTask');
const getRunner = require('./lib/getRunner');
const run = require('./lib/run');

module.exports = co.wrap(function*(taskName, gulpfilePath) {
  if (!taskName) return Promise.reject(new Error('Task name must exists'));
  gulpfilePath = gulpfilePath || path.join(process.cwd(), 'gulpfile.js');
  let task = yield getTask(taskName, gulpfilePath);
  let runner = yield getRunner(gulpfilePath);
  if (!task) {
    let error = new Error(`Can not find task named "${taskName}" in file ${gulpfilePath}`);
    error.stack = `  at ${gulpfilePath}`;
    return Promise.reject(error);
  }
  return yield run(runner, task);
});
