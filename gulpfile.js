var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var concat = require('gulp-concat');
var target = gulp.src('src/index.html');

// clean task, is used to automatically clean the "target" folder
gulp.task('clean', function() {
    return del(['target/**']);
});

// move task, is used to automatically copy images  to target folder
gulp.task('move-img', ['clean'], function() {
    return gulp.src('src/img/**')
        .pipe(gulp.dest('target/img/'));
});

// minify task, is used to automatically minify css files and put it to target folder
gulp.task('minify-css', ['clean', 'move-img'], function() {
    return gulp.src('src/styles/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('target/css/'));
});

// minify task, is used to automatically minify js files and put it to target folder
gulp.task('minify-js', ['clean', 'move-img'], function() {
    return gulp.src('src/app/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('target/js/'));
});

// inject task, is used to automatically inject css and js files to index page
gulp.task('inject', ['minify-css', 'minify-js'], function () {

    var sources = gulp.src(['bower_components/**/*.min.css', '!bower_components/angular-material/modules/**/*.css', 'target/css/*.css',
        'bower_components/**/*.min.js', '!bower_components/angular-material/modules/**/*.js',
            'target/js/**/*.js'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('src/'));
});

// move task, is used to automatically copy html files to target folder
gulp.task('move-html', ['inject'], function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('./'));
});

// watchers:
gulp.task('html-watch', ['move-html'], browserSync.reload);
gulp.task('css-watch', ['inject'], browserSync.reload);
gulp.task('js-watch', ['inject'], browserSync.reload);

// serve task, used to init browser sync module
gulp.task('default', ['move-html'],  function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('src/*.html', ['html-watch']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('src/styles/*.css', ['css-watch']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('src/app/**/*.js', ['js-watch']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});