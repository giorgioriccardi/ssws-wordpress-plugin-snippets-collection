// generated on 2017-12-12 using generator-frontend2017 1.0.0
const gulp = require('gulp');
const hub = require('gulp-hub');
const tests = ['gulpfile-wdio.js'];
const build = ['gulpfile-build.js'];

hub(build.concat(tests));
