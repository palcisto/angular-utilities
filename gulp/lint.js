'use strict';

let gu = require('gulp-util');
let executor = require('child_process');

module.exports = (gulp, $, paths, env) => {
  // lint all the things
  gulp.task('lint', ['lint:js', 'lint:css']);

  // lint js
  gulp.task('lint:js', () => {
    return gulp.src(paths.src.js)
      .pipe($.eslint())
      .pipe($.eslint.format());
  });

  // lint css
  gulp.task('lint:css', () => {
    return gulp.src(paths.src.css)
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe($.sassLint.failOnError());
  });

  // lint js for changed files only
  gulp.task('lint:js:diffs', () => {
    let branchName = executor.execSync('/usr/bin/env git rev-parse --abbrev-ref HEAD').toString('utf8').trim();
    let branchRoot = executor.execSync('/usr/bin/env git merge-base develop ' + branchName).toString('utf8').trim();
    let buf = executor.execSync('/usr/bin/env git diff ' + branchRoot + ' --name-only');
    let files = buf.toString('utf8').split('\n').filter((entry) => { return (entry.length > 0 && entry.match(/\.js$/)) });
    gu.log('Branch [',branchName,'] cut at [',branchRoot.substring(0, 9),'\u00B7\u00B7 ] with changes in:');
    files.forEach((file) => {
      gu.log('  -',file);
    });
    return gulp.src(files)
      .pipe($.eslint())
      .pipe($.eslint.format());
  });
};
