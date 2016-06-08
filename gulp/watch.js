'use strict';

module.exports = (gulp, $, paths, env) => {

  var server;

  // watch for app-related changes
  gulp.task('watch', ['build:dev'], () => {
    server = require('browser-sync').get('app-server');

    gulp.watch(paths.src.css, () => {
      $.runSequence('app-css', server.reload);
    });
    gulp.watch(paths.src.js, () => {
      $.runSequence('app-js', server.reload);
    });
    gulp.watch(paths.src.html, () => {
      $.runSequence('templates-js', server.reload);
    });
  });

  // watch for styleguide-related changes
  gulp.task('watch:styleguide', ['build:styleguide'], () => {
    server = require('browser-sync').get('styleguide-server');

    gulp.watch(paths.src.css, () => {
      $.runSequence(['styleguide-css'], 'hologram', server.reload);
    });
  });
};
