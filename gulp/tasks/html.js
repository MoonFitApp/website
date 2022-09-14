'use strict';
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', () => {
	return gulp.src('src/**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true }))
		.pipe(gulp.dest('dist'));
});