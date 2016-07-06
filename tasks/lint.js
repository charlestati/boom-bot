import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { srcDirectory } from './config';
import browserSync from './watch';

const $ = gulpLoadPlugins();

function lintScripts() {
  return gulp.src(join(srcDirectory, 'scripts', '**', '*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format());
}

gulp.task('lint', lintScripts);
