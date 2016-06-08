'use strict';

const gulp   = require('gulp'),
    $        = require('gulp-load-plugins')({pattern: ['gulp-*', 'main-bower-files', 'del', 'run-sequence']}),
    taskPath = './gulp/',
    taskList = require('fs').readdirSync(taskPath),
    env      = {};

const paths = {
  bower:  'bower_components',
  src: {
    root:  'src',
    html:  'src/**/*.html',
    css:   'src/assets/css/**/*.scss',
    js:    ['src/app/**/*.js', '!src/app/**/*.spec.js'],
    img:   'src/assets/images/**/*',
    fonts: ['src/assets/fonts/**/*', '!src/assets/fonts/**/*.json']
  },
  dev: {
    root:  'dev',
    css:   'dev/assets/css',
    js:    'dev/assets/js',
    img:   'dev/assets/images',
    fonts: 'dev/assets/fonts'
  },
  prod: {
    root:  'dist',
    css:   'dist/assets/css',
    js:    'dist/assets/js',
    img:   'dist/assets/images',
    fonts: 'dist/assets/fonts'
  }
};

taskList.forEach((taskFile) => {
  try {
    require(taskPath + taskFile)(gulp, $, paths, env);
  } catch(error) {
    console.error(taskFile + ' could not be loaded: ' + error);
  }
});
