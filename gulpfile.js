var gulp = require('gulp')
    , clean = require('gulp-clean-dest')
    , browserSync = require('browser-sync')
    ;

gulp.task('default', ['copyBower'], function () {
    gulp.start('watch');
});

gulp.task('cleanBower', function () {
    return gulp.src('src/bower_components')
        .pipe(clean('src/bower_components'));
});

gulp.task('copyBower', ['cleanBower'], function () {
    return gulp.src('bower_components/**/*')
        .pipe(gulp.dest('src/bower_components'));
});

gulp.task('watch', [], function () {
    browserSync.init({
        server: {
            baseDir: './src/'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload)
});