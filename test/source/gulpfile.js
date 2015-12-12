'use strict';

let gulp = require('gulp');

gulp.task('build', () => {
  global.gulpBuildRunned = true;
});


gulp.task('watch', () => {
  global.gulpWatchRunned = true;
});
