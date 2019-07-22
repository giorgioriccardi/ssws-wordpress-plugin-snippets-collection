/* global require process */
const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require('del');
const argv = require('yargs').argv;
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();


/**
 * TESTING
 * wdio default: $ gulp test --suite <functional/visual/etc>
 * wdio alternate: $ gulp test --browser <opera/safari/cbt> --suite <functional/visual/etc>
 */
gulp.task('clean:test', function() {
  return del([
    'test/allure-results',
    'test/allure-report',
    'test/logs',
    'test/sitespeed-result'
  ]);
});

gulp.task('webdriverio', function() {
  let config = 'test/wdio.conf';
  let postfix = '.js';
  let options = {};

  if (argv.suite) {
    options.suite = argv.suite;
  }

  if (argv.browser) {
    postfix = `-${argv.browser}${postfix}`;
  }

  config = `${config}${postfix}`;

  return gulp.src(config)
    .pipe($.plumber())
    .pipe($.webdriver(options))
    .pipe($.plumber.stop());
});

gulp.task('allure:generate', function(cb) {
  let allure = exec('node_modules/.bin/allure generate --clean -o test/allure-report test/allure-results', (error, stdout, stderr) => {  // eslint-disable-line
    cb(error);
  });
  allure.stdout.pipe(process.stdout);
  allure.stderr.pipe(process.stderr);
});

gulp.task('allure:report', function(cb) {
  let allure = exec('node_modules/.bin/allure open test/allure-report', (error, stdout, stderr) => {    // eslint-disable-line
    cb();
  });
  allure.stdout.pipe(process.stdout);
  allure.stderr.pipe(process.stderr);
});

gulp.task('allure', $.sequence(
  'allure:generate',
  'allure:report'
));

gulp.task('test', $.sequence(
  'clean:test',
  'webdriverio',
  'allure'
));
