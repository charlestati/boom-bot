import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { srcDirectory, distDirectory } from './config';

const $ = gulpLoadPlugins();

function copyFonts() {
  return gulp.src(join(srcDirectory, 'fonts', '**', '*'))
    .pipe(gulp.dest(join(distDirectory, 'fonts')))
    .pipe($.size({ title: 'fonts' }));
}

function copyMaps() {
  return gulp.src(join(srcDirectory, 'maps', '**', '*'))
    .pipe(gulp.dest(join(distDirectory, 'maps')))
    .pipe($.size({ title: 'maps' }));
}

function copySprites() {
  return gulp.src(join(srcDirectory, 'sprites', '**', '*'))
    .pipe(gulp.dest(join(distDirectory, 'sprites')))
    .pipe($.size({ title: 'sprites' }));
}

function copyAudio() {
  return gulp.src(join(srcDirectory, 'audio', '**', '*'))
    .pipe(gulp.dest(join(distDirectory, 'audio')))
    .pipe($.size({ title: 'audio' }));
}

function copyRootFiles() {
  return gulp.src(join(srcDirectory, 'root', '**', '*'))
    .pipe(gulp.dest(join(distDirectory)))
    .pipe($.size({ title: 'root' }));
}

gulp.task('copy-fonts', copyFonts);
gulp.task('copy-maps', copyMaps);
gulp.task('copy-sprites', copySprites);
gulp.task('copy-audio', copyAudio);
gulp.task('copy-root-files', copyRootFiles);

gulp.task('copy', [
  'copy-fonts',
  'copy-maps',
  'copy-sprites',
  'copy-audio',
  'copy-root-files',
]);
