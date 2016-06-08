'use strict';

module.exports = (gulp, $, paths, env) => {
  /**
   * Turn off z-index option (temporary until v4 of cssnano)
   * https://github.com/ben-eb/gulp-cssnano/issues/8
   */
  const cssnano      = require('cssnano')({zindex: false});
  const autoprefixer = require('autoprefixer')({browsers: ['last 2 versions']});

  const sassOptions = {
    style: 'expanded',
    precision: 10,
    includePaths: [
      '.',
      'bower_components'
    ]
  };

  const error = {
    title: 'SCSS Error',
    message: (error) => {
      return error.message;
    }
  };

  // build app css
  gulp.task('app-css', () => {
    return gulp.src(paths.src.root + '/assets/css/app.scss')
      .pipe($.if(!env.prod, $.sourcemaps.init()))
        .pipe($.sass(sassOptions))
        .on('error', $.notify.onError(error))
        .pipe($.if(!env.prod, $.postcss([autoprefixer]), $.postcss([autoprefixer, cssnano])))
      .pipe($.if(!env.prod, $.sourcemaps.write()))
      .pipe($.if(env.prod, $.rename('app.min.css')))
      .pipe($.size({title: 'APP CSS', showFiles: true}))
      .pipe($.if(!env.prod && !env.styleguide, gulp.dest(paths.dev.css)))
      .pipe($.if(env.prod && !env.styleguide, gulp.dest(paths.prod.css)))
      .pipe($.if(env.styleguide, gulp.dest(paths.styleguide.css)));
  });

  // build vendor css
  gulp.task('vendor-css', () => {
    return gulp.src($.mainBowerFiles({filter: '**/*.css'}))
      .pipe($.concat('vendor.css'))
      .pipe($.if(env.prod, $.rename('vendor.min.css')))
      .pipe($.if(env.prod, $.postcss([cssnano])))
      .pipe($.size({title: 'VENDOR CSS', showFiles: true}))
      .pipe($.if(!env.prod && !env.styleguide, gulp.dest(paths.dev.css)))
      .pipe($.if(env.prod && !env.styleguide, gulp.dest(paths.prod.css)))
      .pipe($.if(env.styleguide, gulp.dest(paths.styleguide.css)));
  });

  // build styleguide css
  gulp.task('styleguide-css', () => {
    return gulp.src(paths.src.root + '/assets/css/styleguide.scss')
      .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions))
        .on('error', $.notify.onError(error))
        .pipe($.postcss([autoprefixer]))
      .pipe($.sourcemaps.write())
      .pipe($.size({title: 'STYLEGUIDE CSS', showFiles: true}))
      .pipe(gulp.dest(paths.styleguide.css));
  });
};
