import gulp from 'gulp';
import runSequence from 'run-sequence';

function setupServer() {
  return runSequence(
    ['scripts', 'copy', 'images', 'markup', 'styles'],
    'watch'
  );
}

gulp.task('serve', ['clean'], setupServer);
