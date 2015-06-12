// Include gulp and plugins
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
    del = require('del'),
	eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('clean', function(cb) {
    del(['src']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'demo/index.html'
        }
    });
});

gulp.task('scripts', function() {
    return gulp.src('dist/easyCanvas.js')
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

gulp.task('watch', function () {
    gulp.watch('dist/*.js', ['scripts']);
    gulp.watch('dist/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync', 'scripts']);