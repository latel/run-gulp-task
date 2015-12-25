'use strict';

let gulp = require('gulp');

gulp.task('build', () => {
  global.gulpBuildRunned = true;
});

gulp.task('error', () => {
  throw new Error('This is an error');
});

gulp.task('watch', () => {
  global.gulpWatchRunned = true;
});
