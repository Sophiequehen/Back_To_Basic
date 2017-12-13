var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var scsslint = require('gulp-scss-lint');

gulp.task('sass', function() {
  return gulp.src('assets/sass/app.scss')
    .pipe($.sass({
      includePaths: 'assets/sass/vendor',

    })
    .on('error', $.sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('uglify', function () {

        gulp.src('assets/js/app.js'),
        uglify(),
        gulp.dest('public/js/')
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['sass', 'uglify'], function() {
    browserSync.init({
        server: './public/',
        open: true,
        notify: false
    });
		gulp.watch('assets/sass/**/*.scss',['sass']);
		gulp.watch('assets/js/**/*.js', ['uglify']);
		 gulp.watch("public/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);

