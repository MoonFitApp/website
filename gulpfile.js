'use strict';
var gulp = require( 'gulp' );

require( './gulp/tasks/linting' );
require( './gulp/tasks/general' );
require( './gulp/tasks/sass' );
require( './gulp/tasks/browser-sync' );
require( './gulp/tasks/javascript' );
require( './gulp/tasks/watch' );
require( './gulp/tasks/zip' );

require( './gulp/tasks/sass.ge' );
require( './gulp/tasks/javascript.ge' );
require( './gulp/tasks/watch.ge' );
require( './gulp/tasks/zip.ge' );

gulp.task( 'default', gulp.series( 'todo', gulp.parallel( 'bs', 'sass', 'watch:main' ) ) );
