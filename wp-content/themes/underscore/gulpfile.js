var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    sass        = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
        './style.css',
        './js/theme.js',
        './*.php'
    ];

    //initialize browsersync
    browserSync.init(files, {
        //browsersync with a php server
        proxy: "http://www.underscore.dev/",
        notify: false
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
//gulp.task('sass', function () {
//    return gulp.src('sass/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('./'))
//        .pipe(reload({stream:true}));
//});

gulp.task('sass', function(){
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie 9', 'opera 12.1']
        }))
        .pipe(gulp.dest('./'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function () {

    gulp.src('js/src/**/*.js')

        .pipe(jshint())

        .pipe(concat('theme.js'))

        .pipe(gulp.dest('js/'));

});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync', 'js'], function () {
    gulp.watch("js/src/**/*.js", ['js']);
    gulp.watch("sass/**/*.scss", ['sass']);
});