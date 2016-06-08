'use strict';

module.exports = (gulp, $, paths, env) => {
  // create config module with environment constants defined in config.json
  gulp.task('config', () => {
    const options = (env) => {
      return {
        createModule: true,
        environment: env,
        wrap: true
      };
    };

    return gulp.src('config/config.json')
      .pipe($.if(!env.prod, $.ngConfig('constants', options('local'))))
      .pipe($.if(env.prod, $.ngConfig('constants', options('production'))))
      .pipe($.rename('app.constants.js'))
      .pipe(gulp.dest(paths.src.root + '/app'));
  });
};
