 // Include gulp
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    gcmq = require('gulp-group-css-media-queries'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');    

gulp.task('html', function () {
    gulp.src('*.html')
});

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('files/css/build/*.scss') 
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(gcmq())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('files/css'));
});

// Compile js
gulp.task('scripts', function() {
    return gulp.src([
        'files/js/build/jquery-3.3.1.min.js',
        'files/js/build/TweenMax.min.js',
        'files/js/build/ScrollToPlugin.min.js',
        'files/js/build/fully.js',
        'files/js/build/jquery.waypoints.js', 
        'files/js/build/owl.carousel.min.js',
        'files/js/build/ScrollMagic.min.js',
        'files/js/build/animation.gsap.js',
        'files/js/build/main.js'])
        .pipe(concat('scripts.js'))
        .pipe(rename('minify.js'))
        .pipe(uglify())
        .pipe(gulp.dest('files/js'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(['*.html'], ['html']);
    gulp.watch('files/js/build/*.js', ['scripts']);
    gulp.watch('files/css/build/*.scss', ['sass']);
});

// run Task when gulp
gulp.task('default', ['scripts', 'sass', 'watch']);