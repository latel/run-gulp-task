'use strict';

const runSeq = require('run-sequence');
const co = require('co');
const getGulpInst = require('get-gulp-inst');
let cache = {};

module.exports = co.wrap(function*(source) {
  if (cache[source]) return cache[source];
  let inst = yield getGulpInst(source);
  cache[source] = runSeq.use(inst);
  return cache[source];
});
