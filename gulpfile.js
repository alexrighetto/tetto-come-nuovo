var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    /* permette di gestire i file cofeescript */
    coffee      = require('gulp-coffee'),
    /* permette di richiedere librerie js nei files js */
    browserify  = require('gulp-browserify'),
    /* permette di richiedere librerie js nei files js */
    compass     = require('gulp-compass'),
    connect     = require('gulp-connect'),
    /* permette di concatenare i files javascript in un unico singolo file */
    concat      = require('gulp-concat');
    

/* È utile indicare tramite array le sorgenti dei file. L'asterisco inoltre significa: 'tutti i file' */
var coffeeSources = ['components/coffee/*.coffee'];

/* Indico tramite array i files js, allo scopo di comprimerli in un singolo. È importante l'ordine */
var jsSources = [
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

/* Indico tramite array i files sass */
var sassSources = ['components/sass/style.scss'];

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
        /* invio il tutto a browserify */
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload());
});

/*
Questa task serve per unire in un unico file i css ed interpretare SASS.
*/
gulp.task('compass', function () {
    gulp.src(sassSources)
        /* il file style.css viene trasformato attraerso compass */
        .pipe(compass({
            /* questa linea è molto importante */
            css: 'builds/development/css',
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        }))
        
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('connect', function () {
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch' ]);

