var gulp = require('gulp')
    , clean = require('gulp-clean-dest')
    , browserSync = require('browser-sync')
    , cssmin = require('gulp-cssmin')
    , uglify = require('gulp-uglify')
    ;

gulp.task('default', ['copyBower', 'copy'], function () {
    gulp.start('buildCss', 'buildJs', 'watch');
});

gulp.task('copyBower', ['cleanBower'], function () {
    return gulp.src('bower_components/**/*')
        .pipe(gulp.dest('src/bower_components'));
});

gulp.task('cleanBower', function () {
    return gulp.src('src/bower_components')
        .pipe(clean('src/bower_components'));
});

gulp.task('cleanDest', function () {
    return gulp.src('dest')
        .pipe(clean('dest'));
});

gulp.task('copy', ['cleanDest'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dest/'));
});

gulp.task('buildCss', function () {
    gulp.src('dest/module/hello-notify.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dest/module/'));
});

gulp.task('buildJs', function () {
    gulp.src('dest/module/hello-notify.js')
        .pipe(uglify())
        .pipe(gulp.dest('dest/module/'));
});

gulp.task('watch', [], function () {
    browserSync.init({
        server: {
            baseDir: './dest/'
        }
    });

    gulp.watch('src/**/*').on('change', function () {
        gulp.start('copy', 'buildCss', 'buildJs');
        browserSync.reload();
    });
});

gulp.task('watchSrc', function () {
    browserSync.init({
        server: {
            baseDir: './src/'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch('src/**/*').on('change', function () {

    });
});