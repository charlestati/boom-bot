import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { srcDirectory, distDirectory } from './config';
import browserSync from './watch';

const $ = gulpLoadPlugins();

function buildStyles() {
  return gulp.src([
    join(srcDirectory, 'styles', 'main.scss'),
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(join(distDirectory, 'styles')))
    .pipe(browserSync.stream());
}

function buildMinifiedStyles() {
  return gulp.src([
    join(srcDirectory, 'styles', 'main.scss'),
  ])
    .pipe($.sass({
      precision: 10,
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe($.cssnano())
    .pipe(gulp.dest(join(distDirectory, 'styles')));
}

gulp.task('styles', buildStyles);
gulp.task('styles:build', buildMinifiedStyles);
