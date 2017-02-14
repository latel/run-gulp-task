'use strict';

module.exports = (runner, task) => new Promise((resolve, reject) => {
  let exceptionCbList = process.listeners('uncaughtException');
  let rejectionCbList = process.listeners('unhandledRejection');
  let exceptionCbListBinder = e => {
    e = typeof e === 'string' ? new Error(e) : e;
    exceptionCbList.forEach(lst => process.on('uncaughtException', lst));
    reject(e);
  };
  let rejectionCbListBinder = e => {
    e = typeof e === 'string' ? new Error(e) : e;
    rejectionCbList.forEach(lst => process.on('unhandledRejection', lst));
    reject(e);
  };
  process.removeAllListeners('uncaughtException');
  process.removeAllListeners('unhandledRejection');
  process.once('uncaughtException', exceptionCbListBinder);
  process.once('unhandledRejection', rejectionCbListBinder);
  return runner(task.taskName, e => {
    process.removeListener('uncaughtException', exceptionCbListBinder);
    process.removeListener('unhandledRejection', rejectionCbListBinder);
    if (e) return reject(e);
    return resolve();
  });
});
