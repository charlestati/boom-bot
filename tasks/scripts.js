import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import assign from 'object-assign';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { join } from 'path';
import { srcDirectory, distDirectory } from './config';
import browserSync from './watch';

const $ = gulpLoadPlugins();

const customOpts = {
  entries: join(srcDirectory, 'scripts', 'main.js'),
  debug: true,
  transform: babelify,
};

const config = assign({}, watchify.args, customOpts);
const bundler = watchify(browserify(config));
const buildBundler = browserify(config);

function bundle() {
  return bundler.bundle()
    .on('error', e => $.util.log.call(this, e))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(join(distDirectory, 'scripts')))
    .pipe(browserSync.stream());
}

function buildBundle() {
  return buildBundler.bundle()
    .on('error', e => $.util.log.call(this, e))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest(join(distDirectory, 'scripts')))
    .pipe($.size({ title: 'scripts' }));
}

gulp.task('scripts', ['lint'], bundle);
gulp.task('scripts:build', ['lint'], buildBundle);
bundler.on('update', bundle);
bundler.on('log', $.util.log);
