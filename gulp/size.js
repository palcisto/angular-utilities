'use strict';

module.exports = (gulp, $, paths, env) => {
  // output size of dev build
  gulp.task('size:dev', () => {
    return gulp.src(paths.dev.root + '/**/*.{html,css,js}')
      .pipe($.size({title: 'DEV BUILD'}));
  });

  // output size of prod build
  gulp.task('size:prod', () => {
    return gulp.src(paths.prod.root + '/**/*.{html,css,js}')
      .pipe($.size({title: 'PROD BUILD'}));
  });
};
