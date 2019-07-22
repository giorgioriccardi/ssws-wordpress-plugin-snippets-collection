/* global require*/
// generated on 2017-08-03 using generator-frontend2017 1.0.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();

let dev = true;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    // .pipe($.sassLint.failOnError())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.'));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/main.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.browserify({ transform: ['babelify'], debug : true}))
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('scripts'));
});

gulp.task('watch', () => {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['lint', 'scripts']);
});

gulp.task('minifyjs', () => {
  return gulp.src('main.js')
    .pipe($.uglify({compress: {drop_console: true}}))
    .pipe(gulp.dest('.'));
});

gulp.task('minifycss', () => {
  return gulp.src('style.css')
    .pipe($.cssnano({safe: true, autoprefixer: false}))
    .pipe(gulp.dest('.'));
});

gulp.task('build', () => {
  return new Promise(resolve => {
    runSequence('default', ['minifycss', 'minifyjs'], resolve);
  });
});

/**
 * The linting task for javascript
 * @param  {String} files Files to be linted
 * @return {[type]}       [description]
 */
function lint(files) {
  return gulp.src([files, '!node_modules/**'])
    .pipe($.eslint({ fix: true }))
    .pipe($.eslint.format());
    // .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('app/images'));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence('lint', ['scripts', 'styles', 'images'], resolve);
  });
});
