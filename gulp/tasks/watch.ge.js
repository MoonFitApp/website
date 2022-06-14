'use strict';
var gulp   = require( 'gulp' ),
    paths  = require( '../paths.ge' ),
    bs     = require( 'browser-sync' ).create(),
    reload = bs.reload;

gulp.task( 'watch:ge:main', function() {
	gulp.watch( paths.sass.watch, gulp.series( 'sass:ge' ) );
	gulp.watch( paths.javascript.src, gulp.series( 'javascript:ge' ) );
} );
