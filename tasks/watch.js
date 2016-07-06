import gulp from 'gulp';
import bs from 'browser-sync';
import { join } from 'path';
import { server, srcDirectory } from './config';

const browserSync = bs.create();

function watchChanges() {
  browserSync.init({
    notify: false,
    logPrefix: 'BB',
    server: server.serve,
    port: server.port,
    open: false,
  });

  gulp.watch(join(srcDirectory, 'templates', '**', '*.jade'), ['markup']);
  gulp.watch(join(srcDirectory, 'images', '**', '*'), ['images']);
  gulp.watch(join(srcDirectory, 'styles', '**', '*.scss'), ['styles']);
  gulp.watch(join(srcDirectory, 'scripts', '**', '*.js'), ['lint']);
  gulp.watch([
    join(srcDirectory, 'root', '**', '*'),
    join(srcDirectory, 'maps', '**', '*'),
    join(srcDirectory, 'audio', '**', '*'),
  ], ['copy']);
}

gulp.task('watch', watchChanges);

export default browserSync;
