var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    coffee  = require('gulp-coffee');
/* 
È utile indicare tramite arrai le sorgenti dei file.
L'asterisco inoltre significa: 'tutti i file'
*/
var coffeeSources = ['components/coffee/*.coffee'];

gulp.task('log', function () {
    gutil.log('it works!');
});

gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({ bare: true})
              .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'));
});