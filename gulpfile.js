const gulp = require('gulp');
const path = require('path');

const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')
var del = require('del');
var fs = require('fs');
var runSequence = require('run-sequence');
var semver = require('semver');

var gutil = require('gulp-util')
var chalk = require('chalk')

var plugins = require('gulp-load-plugins')();

var getPackageJson = () => JSON.parse(fs.readFileSync('./package.json'))

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.emit('end');
}


var bundle_js = (bundler) => {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('jaffa.js'))
    .pipe(buffer())
    .pipe(gulp.dest('.tmp'))
    // .pipe(rename('app.min.js'))
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'))
}

gulp.task('copy:assets', () => {
  return gulp.src('index.html')
    .pipe(gulp.dest('.tmp'))
})

gulp.task('watch', ['copy:assets'], function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify('lib/index.js', args))
    .transform(babelify, { presets: ['es2015'] })
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler)
  })
})
