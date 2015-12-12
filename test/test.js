'use strict';
require('should');
require('should-promised');
const path = require('path');
const runGulpTask = require('../index');
const CWD = process.cwd();

describe('runGulpTask', () => {
  beforeEach(() => process.chdir(path.join(__dirname, 'source')));
  afterEach(() => process.chdir(CWD));
  it('should run task', done => {
    global.gulpBuildRuned = false;
    return runGulpTask('build')
      .then(() => {
        global.gulpBuildRunned.should.be.true();
        done();
      });
  });
  it('should try a list of tasks and run the first which could be found', done => {
    global.gulpBuildRuned = false;
    return runGulpTask(['notExists', 'watch'])
      .then(() => {
        global.gulpWatchRunned.should.be.true();
        done();
      });
  });
  it('should reject when error', () => {
    return runGulpTask('notExists')
      .should.be.rejectedWith(Error, {
        message: `Can not find task named "notExists" in file ${path.join(process.cwd(), 'gulpfile.js')}`
      });
  });
  it('should reject when no task name', () => {
    return runGulpTask()
      .should.be.rejectedWith(Error, {
        message: 'Task name must exists'
      });
  });
});
