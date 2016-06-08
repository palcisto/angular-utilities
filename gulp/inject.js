'use strict';

module.exports = (gulp, $, paths, env) => {
  // inject js and css into index.html for dev build
  gulp.task('inject:dev', () => {
    const scripts = gulp.src([
      // order is important here
      paths.dev.js + '/vendor.js',
      paths.dev.js + '/app.js',
      paths.dev.js + '/templates.js'
    ], {read: false});

    const styles = gulp.src([
      // order is important here
      paths.dev.css + '/app.css'
    ], {read: false});

    const injectOptions = {
      ignorePath: paths.dev.root,
      addRootSlash: false
    };

    return gulp.src(paths.src.root + '/index.html')
      .pipe($.inject(styles, injectOptions))
      .pipe($.inject(scripts, injectOptions))
      .pipe(gulp.dest(paths.dev.root));
  });

  // inject js and css into index.html for prod build
  gulp.task('inject:prod', () => {
    const styles = gulp.src([
      // order is important here
      paths.prod.css + '/app.min.css'
    ], {read: false});

    const scripts = gulp.src([
      // order is important here
      paths.prod.js + '/app.min.js',
    ], {read: false});

    const newRelic = gulp.src([
      paths.prod.js + '/new-relic.min.js'
    ], {read: false});

    const injectOptions = {
      ignorePath: paths.prod.root,
      addRootSlash: false
    };

    const newRelicOptions = {
      ignorePath: paths.prod.root,
      addRootSlash: false,
      starttag: '<!-- inject:head:js -->'
    };

    return gulp.src(paths.src.root + '/index.html')
      .pipe($.inject(styles, injectOptions))
      .pipe($.inject(scripts, injectOptions))
      .pipe($.inject(newRelic, newRelicOptions))
      .pipe(gulp.dest(paths.prod.root));
  });

  // inject bower deps into karma.conf.js for running unit tests
  gulp.task('inject:test', () => {
    const files = gulp.src(
      $.mainBowerFiles({filter: '**/*.js'}),
      {read: false});

    return gulp.src('test/karma.conf.js')
      .pipe($.inject(files, {
        starttag: '// inject:bower',
        endtag: '// endinject',
        transform: (filepath) => {
          return `'${filepath}',`;
        },
        addRootSlash: false
      }))
      .pipe(gulp.dest('test'));
  });
};
