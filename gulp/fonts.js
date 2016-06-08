'use strict';

module.exports = (gulp, $, paths, env) => {
  // copy fonts to dev/prod/styleguide
  gulp.task('fonts', () => {
    return gulp.src(paths.src.fonts)
      .pipe($.size({title: 'FONTS', showFiles: false}))
      .pipe($.if(!env.prod && !env.styleguide, gulp.dest(paths.dev.fonts)))
      .pipe($.if(env.prod && !env.styleguide, gulp.dest(paths.prod.fonts)))
      .pipe($.if(env.styleguide, gulp.dest(paths.styleguide.fonts)));
  });
};
