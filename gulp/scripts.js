'use strict';

module.exports = (gulp, $, paths, env) => {
  // build js for dev
  gulp.task('js:dev', ['vendor-js', 'app-js', 'templates-js']);

  // build vendor js
  gulp.task('vendor-js', () => {
    return gulp.src($.mainBowerFiles({filter: '**/*.js'}))
      .pipe($.sourcemaps.init())
        .pipe($.concat('vendor.js'))
      .pipe($.sourcemaps.write())
      .pipe($.size({title: 'VENDOR JS', showFiles: true}))
      .pipe($.if(!env.prod && !env.styleguide, gulp.dest(paths.dev.js)))
      .pipe($.if(env.prod && !env.styleguide, gulp.dest(paths.prod.js)))
      .pipe($.if(env.styleguide, gulp.dest(paths.styleguide.js)));
  });

  // build app js
  gulp.task('app-js', () => {
    return gulp.src(paths.src.js)
      .pipe($.sourcemaps.init())
        .pipe($.babel({
          presets: ['es2015']
        }))
        .pipe($.concat('app.js'))
      .pipe($.sourcemaps.write())
      .pipe($.size({title: 'APP JS', showFiles: true}))
      .pipe($.if(!env.prod && !env.styleguide, gulp.dest(paths.dev.js)))
      .pipe($.if(env.prod && !env.styleguide, gulp.dest(paths.prod.js)))
      .pipe($.if(env.styleguide, gulp.dest(paths.styleguide.js)));
  });

  // concatenate all html content & use angular's template cache
  gulp.task('templates-js', () => {
    return gulp.src([paths.src.html, '!src/index.html'])
      .pipe($.angularTemplatecache({module: 'ims'}))
      .pipe($.if(!env.prod, gulp.dest(paths.dev.js), gulp.dest(paths.prod.js)));
  });

  // build styleguide js
  gulp.task('styleguide-js', () => {
    return gulp.src(paths.src.root + '/assets/js/styleguide.js')
      .pipe(gulp.dest(paths.styleguide.js));
  });

  // build new relic js
  gulp.task('new-relic', () => {
    let fs = require('fs');
    let newRelicScript = 'src/assets/js/new-relic.min.js';
    let envConfig      = JSON.parse(fs.readFileSync('config/config.json'));
    let appId          = envConfig.production.newRelicId;

    return gulp.src(newRelicScript)
      .pipe($.replace(/(applicationID:"(.*?)")/g, `applicationID:"${appId}"`))
      .pipe(gulp.dest(paths.prod.js));
  });

  // build js for prod
  gulp.task('js:prod', ['js:dev', 'new-relic'], () => {
    const sourceFiles = [
      // order is important here
      paths.prod.js + '/vendor.js',
      paths.prod.js + '/app.js',
      paths.prod.js + '/templates.js'
    ];

    return gulp.src(sourceFiles)
      .pipe($.concat('app.min.js'))
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe($.size({title: 'APP JS', showFiles: true}))
      .pipe(gulp.dest(paths.prod.js))
      .on('end', () => {
        return $.del(sourceFiles);
      });
  });
};
