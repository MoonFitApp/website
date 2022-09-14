const gulp = require("gulp");

gulp.task('copy', () => {
    return gulp.src(['src/moonfit-landing/assets/**/*']).pipe(gulp.dest('dist/moonfit-landing/assets'))
});