import gulp from 'gulp';
import del from 'del';
import { join } from 'path';
import { distDirectory } from './config';

function deleteDistDir() {
  return del([join(distDirectory, '*'), join(`!${distDirectory}`, '.git')]);
}

gulp.task('clean', deleteDistDir);
