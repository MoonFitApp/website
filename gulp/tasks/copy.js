const gulp = require("gulp");

gulp.task('copy-assets', () => {
    return gulp.src(['src/moonfit-landing/assets/**/*']).pipe(gulp.dest('dist/moonfit-landing/assets'))
});

gulp.task('copy-assets-litepaper', () => {
    return gulp.src(['src/moonfit-landing/litepaper/assets/**/*']).pipe(gulp.dest('dist/moonfit-landing/litepaper/assets'))
});
