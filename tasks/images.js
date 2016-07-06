import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { srcDirectory, distDirectory } from './config';
import browserSync from './watch';

const $ = gulpLoadPlugins();

function copyImages() {
  return gulp.src(join(srcDirectory, 'images', '**', '*'))
    .pipe($.changed(join(distDirectory, 'images')))
    .pipe(gulp.dest(join(distDirectory, 'images')))
    .pipe(browserSync.stream());
}

function copyMinifiedImages() {
  return gulp.src(join(srcDirectory, 'images', '**', '*'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
    }))
    .pipe(gulp.dest(join(distDirectory, 'images')))
    .pipe($.size({ title: 'images' }));
}

gulp.task('images', copyImages);
gulp.task('images:build', copyMinifiedImages);
