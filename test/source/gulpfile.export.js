'use strict';

let gulp = require('gulp');
let PluginError = require('gulp-util').PluginError;
let through = require('through2');

gulp.task('build', () => {
  global.gulpBuildRunned = true;
});

gulp.task('error', () => {
  throw new Error('This is an error');
});

gulp.task('watch', () => {
  global.gulpWatchRunned = true;
});

gulp.task('pluginerror', () => {
  return gulp.src('src/**/*.less')
    .pipe(through.obj((file, encoding, callback) => {
      callback(new PluginError('plugin name', 'plugin error occured', {
        showStack: true
      }));
    }))
    .pipe(gulp.dest('build'));
});

module.exports = gulp;
