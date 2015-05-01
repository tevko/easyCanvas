// Include gulp and plugins
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
    del = require('del'),
	eslint = require('gulp-eslint');

gulp.task('clean', function(cb) {
    del(['src']);
});

gulp.task('scripts', function() {
    return gulp.src('dev/easyCanvas.js')
        .pipe(eslint({
            rules: {
                'quotes': [2, 'single']
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
    gulp.watch('dev/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);