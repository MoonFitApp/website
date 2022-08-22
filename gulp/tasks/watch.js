'use strict';
var gulp   = require( 'gulp' ),
    paths  = require( '../paths' ),
    bs     = require( 'browser-sync' ).create(),
    reload = bs.reload;

gulp.task( 'watch:main', function() {
	gulp.watch( paths.sass.watch, gulp.series( 'sass' ) );
	gulp.watch( paths.sass.litepaper.watch, gulp.series( 'sass:litepaper' ) );
	gulp.watch( paths.javascript.src, gulp.series( 'javascript:dev' ) );
} );
