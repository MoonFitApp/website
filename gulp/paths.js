'use strict';
var glob      = require( 'glob' ),
    files     = glob( 'src/*', { sync: true } ),
    mainTheme = files[ 0 ].replace( 'src/', '' ),
    litepaper = mainTheme + '/litepaper';

module.exports = {
	mainTheme: mainTheme,
	litepaper: mainTheme + '/litepaper',
	taskDone: [
		'src/**/*.php',
		'gulp/**/*.js'
	],
	root: {
		main: 'src/' + mainTheme + '/'
	},
	javascript: {
		src: 'src/' + mainTheme + '/assets/js-code/**/*.js',
		dist: 'src/' + mainTheme + '/assets/js/',
		litepaper: {
			src: 'src/' + litepaper + '/assets/js-code/**/*.js',
			dist: 'src/' + litepaper + '/assets/js/'
		}
	},
	sass: {
		watch: [
			'src/' + mainTheme + '/assets/scss/**/*.scss'
		],
		generate: [
			'src/' + mainTheme + '/assets/scss/*.scss'
		],
		dist: 'src/' + mainTheme + '/assets/css/',
		litepaper: {
			watch: [
				'src/' + litepaper + '/assets/scss/**/*.scss'
			],
			generate: [
				'src/' + litepaper + '/assets/scss/*.scss'
			],
			dist: 'src/' + litepaper + '/assets/css/',
		}
	},
	bs: {
		main: [
			'src/' + mainTheme + '/*.html',
			'src/' + mainTheme + '/assets/css/*.css',
			'src/' + mainTheme + '/assets/js/*.js',
			'src/' + mainTheme + '/assets/libs/**/**/*.js'
		],
		litepaper: [
			'src/' + litepaper + '/*.html',
			'src/' + litepaper + '/assets/css/*.css',
			'src/' + litepaper + '/assets/js/*.js',
			'src/' + litepaper + '/assets/libs/**/**/*.js'
		]
	},
	linting: {
		js: 'src/' + mainTheme + '/assets/js-code/',
		scss: 'src/' + mainTheme + '/assets/scss/**/*.scss',
	}
};
