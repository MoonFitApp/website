'use strict';
var gulp = require( 'gulp' );

gulp.src(['src/moonfit-landing/assets/**/*']).pipe(gulp.dest('dist/moonfit-landing/assets'))

require( './gulp/tasks/linting' );
require( './gulp/tasks/general' );
require( './gulp/tasks/sass' );
require( './gulp/tasks/browser-sync' );
require( './gulp/tasks/javascript' );
require( './gulp/tasks/watch' );
require( './gulp/tasks/zip' );
require( './gulp/tasks/html' );

gulp.task( 'default', gulp.series( 'todo', gulp.parallel( 'bs', 'sass', 'watch:main' ) ) );
