// Include gulp and plugins
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
    del = require('del'),
	eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    run = require('gulp-run');

gulp.task('clean', function(cb) {
    del(['src']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'http://localhost:2020/demo/'
    });
});

gulp.task('scripts', function() {
    return gulp.src('dev/easyCanvas.js')
        .pipe(eslint({
            rules: {
                'quotes': [2, 'single'],
                'no-console': 1
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest('src'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src'));
});

gulp.task('caddy', ['watch', 'scripts'], function() {
   run('caddy').exec(); 
});

gulp.task('js-watch', ['scripts']);

gulp.task('watch', function () {
    gulp.watch('dev/*.js', ['scripts']);
    gulp.watch('dev/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['caddy', 'browser-sync']);