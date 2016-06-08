'use strict';

module.exports = (gulp, $, paths, env) => {
  // build app for dev
  gulp.task('build:dev', ['clean:dev'], (cb) => {
    env.prod = false;
    $.runSequence('config', ['js:dev', 'vendor-css', 'app-css', 'img', 'fonts'], 'inject:dev', 'size:dev', cb);
  });

  // build app for prod
  gulp.task('build:prod', ['clean:prod'], (cb) => {
    env.prod = true;
    $.runSequence('config', ['js:prod', 'vendor-css', 'app-css', 'img', 'fonts'], 'inject:prod', 'html:prod', 'size:prod', cb);
  });

  // build styleguide
  gulp.task('build:styleguide', ['clean:styleguide'], (cb) => {
    env.prod = false;
    env.styleguide = true;
    $.runSequence(['vendor-js', 'app-js', 'styleguide-js', 'vendor-css', 'styleguide-css', 'img', 'fonts'], 'hologram', cb);
  });

  // default hologram task
  gulp.task('hologram', () => {
    return gulp.src(paths.styleguide.root + '/hologram_config.yml')
      .pipe($.hologram());
  });
};
