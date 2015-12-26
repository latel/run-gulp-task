'use strict';
module.exports = (runner, task) => new Promise((resolve, reject) => {
  let lsts = process.listeners('uncaughtException');
  process.removeAllListeners('uncaughtException');
  process.once('uncaughtException', e => {
    lsts.forEach(lst => process.on('uncaughtException', lst));
    reject(e);
  });
  return runner(task.taskName, e => {
    if (e) return reject(e);
    resolve();
  });
});
