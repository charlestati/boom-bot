import gulp from 'gulp';
import runSequence from 'run-sequence';

function buildProject(cb) {
  return runSequence(['images:build', 'styles:build', 'scripts:build', 'markup:build', 'copy'], cb);
}

gulp.task('build', ['clean'], buildProject);
