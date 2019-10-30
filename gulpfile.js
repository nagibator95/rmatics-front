const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('clean', function() {
    return del(['src/assets/icons/symbol']);
});

gulp.task('icons', function() {
    return gulp
        .src('src/assets/icons/**/*')
        .pipe(
            svgmin({
                plugins: [{removeTitle: true}, {removeDesc: {removeAny: true}}],
            }),
        )
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: 'sprite',
                    },
                },
            }),
        )
        .pipe(gulp.dest('src/assets/icons'));
});

gulp.task('default', function(callback) {
    runSequence('clean', 'icons', callback);
});
