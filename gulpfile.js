var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    /* permette di gestire i file cofeescript */
    coffee      = require('gulp-coffee'),
    /* permette di richiedere librerie js nei files js */
    browserify  = require('gulp-browserify'),
    /* permette di richiedere librerie js nei files js */
    compass     = require('gulp-compass'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    minifyHTML  = require('gulp-minify-html'),
    connect     = require('gulp-connect'),
    /* permette di concatenare i files javascript in un unico singolo file */
    concat      = require('gulp-concat');
 
var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';


if (env === 'development') {
    outputDir = 'development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'production/';
    sassStyle = 'compressed';
}

/* È utile indicare tramite array le sorgenti dei file. L'asterisco inoltre significa: 'tutti i file' */
coffeeSources = ['components/coffee/*.coffee'];

/* Indico tramite array i files js, allo scopo di comprimerli in un singolo. È importante l'ordine */
jsSources = [
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

/* Indico tramite array i files sass */
sassSources = ['components/sass/style.scss'];

htmlSources = ['builds/' + outputDir + '*.html'];


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
        .pipe(gulp.dest('builds/' + outputDir + 'js'))
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
            css: 'builds/' + outputDir + 'css',
            sass: 'components/sass',
            style: sassStyle
        }))
        
    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function () {
  connect.server({
    root: 'builds/' + outputDir ,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(htmlSources)
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir))) 
    .pipe(connect.reload());
});

gulp.task('default', ['html', 'coffee', 'js', 'compass', 'connect', 'watch' ]);

