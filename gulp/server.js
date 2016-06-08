'use strict';

module.exports = (gulp, $, paths, env) => {

  const appServer          = require('browser-sync').create('app-server');
  const styleguideServer   = require('browser-sync').create('styleguide-server');
  const historyApiFallback = require('connect-history-api-fallback');

  const browserSyncInit = (dir, isAppServer) => {
    if (isAppServer) {
      appServer.init({
        port: 8000,
        open: 'external',
        host: 'king.ims.dev',
        server: {
          baseDir: dir,
          middleware: historyApiFallback()
        }
      });
    } else {
      styleguideServer.init({
        port: 7000,
        server: {
          baseDir: dir
        }
      });
    }
  };

  // start server pointing to dev build
  gulp.task('serve', ['watch'], () => {
    browserSyncInit(paths.dev.root, true);
  });

  // start server pointing to prod build
  gulp.task('serve:prod', ['build:prod'], () => {
    browserSyncInit(paths.prod.root, true);
  });

  // start server pointing to styleguide build
  gulp.task('serve:styleguide', ['watch:styleguide'], () => {
    browserSyncInit(paths.styleguide.build, false);
  });
};
