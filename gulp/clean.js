'use strict';

module.exports = (gulp, $, paths, env) => {
  // clean it all
  gulp.task('clean', ['clean:dev', 'clean:prod', 'clean:styleguide']);

  // clean dev build directory
  gulp.task('clean:dev', () => {
    return $.del([paths.dev.root]);
  });

  // clean prod build directory
  gulp.task('clean:prod', () => {
    return $.del([paths.prod.root]);
  });

  // clean styleguide directory
  gulp.task('clean:styleguide', () => {
    return $.del([paths.styleguide.build]);
  });
};
