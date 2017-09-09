var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    /* permette di gestire i file cofeescript */
    coffee  = require('gulp-coffee'),
    /* permette di concatenare i files javascript in un unico singolo file */
    concat  = require('gulp-concat');

/* È utile indicare tramite array le sorgenti dei file. L'asterisco inoltre significa: 'tutti i file' */
var coffeeSources = ['components/coffee/*.coffee'];

/* Indico tramite array i files js, allo scopo di comprimerli in un singolo. È importante l'ordine */
var jsSources = [
    'components/scripts/tagline.js'
];

/*
Questa è una task di testing per verificare il corretto funzionamento del file gulpfile.js. È possibile rimuoverla in qualsiasi momento.
*/
gulp.task('log', function () {
    gutil.log('it works!');
});

/*
Questa task serve per trasformare i file coffee in file di js, salvandoli all'interno della cartella 'components/scripts'.
*/
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({ bare: true})
              .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'));
    gutil.log('Eseguito coffee');
});

/*
Questa task serve per unire in un unico file i js.
*/
gulp.task('js', function () {
    gulp.src(jsSources)
        /* concateno e salvo in un nome specifico */
        .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'));
    gutil.log('Eseguito js');
});