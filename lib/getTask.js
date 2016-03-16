'use strict';

const co = require('co');
const getGulpInst = require('get-gulp-inst');
const _ = require('lodash');

module.exports = co.wrap(function*(taskName, filepath) {
  let inst = null;
  if (_.isString(filepath))
    inst = yield getGulpInst(filepath);
  else if (filepath.tasks)
    inst = filepath;
  else
    return null;
  let tasks = inst.tasks;
  taskName = Array.isArray(taskName) ? taskName : [taskName];
  taskName = _.find(taskName, name => !!tasks[name]);
  if (!taskName) return null;
  let task = tasks[taskName];
  task.taskName = taskName;
  return task;
});
