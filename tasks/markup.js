import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { srcDirectory, distDirectory } from './config';
import browserSync from './watch';

const $ = gulpLoadPlugins();

function buildMarkup() {
  return gulp.src(join(srcDirectory, 'templates', '**', '*.jade'))
    .pipe($.jade({
      pretty: true,
    }))
    .on('error', $.util.log)
    .pipe(gulp.dest(distDirectory))
    .pipe(browserSync.stream());
}

function buildMinifiedMarkup() {
  return gulp.src(join(srcDirectory, 'templates', '**', '*.jade'))
    .pipe($.jade())
    .on('error', $.util.log)
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true,
    }))
    .pipe(gulp.dest(distDirectory))
    .pipe($.size({ title: 'markup' }))
    .pipe(browserSync.stream());
}

gulp.task('markup', buildMarkup);
gulp.task('markup:build', buildMinifiedMarkup);
