var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    util = require('gulp-util');

var paths = {
  styles: ['src/styles/horn.less'],
  services: ['src/scripts/services/*.js'],
  directives: ['src/scripts/directives/*.js']
};

gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(less())
    .pipe(gulp.dest('src/styles'))
});

gulp.task('watch', function () {
  gulp.watch('src/styles/*.less', ['styles']);
  gulp.watch(paths.services, ['build']);
  gulp.watch(paths.directives, ['build']);
});

gulp.task('build', function () {
  gulp.src(paths.services)
    .pipe(concat('services.js'))
    .pipe(gulp.dest('src/scripts'));

  gulp.src(paths.directives)
    .pipe(concat('directives.js'))
    .pipe(gulp.dest('src/scripts'));
});

gulp.task('default', ['styles', 'build', 'watch']);
