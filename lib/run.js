'use strict';
module.exports = (runner, task) => new Promise((resolve, reject) => {
  let lsts = process.listeners('uncaughtException');
  let binder = e => {
    lsts.forEach(lst => process.on('uncaughtException', lst));
    reject(e);
  };
  process.removeAllListeners('uncaughtException');
  process.once('uncaughtException', binder);
  return runner(task.taskName, e => {
    process.removeListener('uncaughtException', binder);
    if (e) return reject(e);
    resolve();
  });
});
