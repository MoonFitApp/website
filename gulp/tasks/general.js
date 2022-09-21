'use strict';
var gulp = require( 'gulp' ),
    $    = require( 'gulp-load-plugins' )(),
    task = require( '../paths' ).taskDone;

// Generate list of task need to done before release theme
gulp.task( 'todo', function() {
	return gulp.src( task )
	           .pipe( $.todo( { verbose: true } ) )
	           .pipe( gulp.dest( './' ) );
} );
