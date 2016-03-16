'use strict';

const runSeq = require('run-sequence');
const co = require('co');
const getGulpInst = require('get-gulp-inst');
const _ = require('lodash');
let cache = {};

module.exports = co.wrap(function*(source) {
  const key = Symbol(source);
  if (cache[key]) return cache[key];
  let inst = null;
  if (_.isString(source))
    inst = yield getGulpInst(source);
  else
    inst = source;
  cache[key] = runSeq.use(inst);
  return cache[key];
});
