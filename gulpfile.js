'use strict';
var gulp = require('gulp');

require('./gulp/tasks/html');
require('./gulp/tasks/linting');
require('./gulp/tasks/general');
require('./gulp/tasks/sass');
require('./gulp/tasks/browser-sync');
require('./gulp/tasks/javascript');
require('./gulp/tasks/watch');
require('./gulp/tasks/html');
require('./gulp/tasks/copy');

gulp.task('build', gulp.series('copy-assets', gulp.parallel('javascript:production', 'sass:full', 'sass:full:litepaper', 'minify-html', 'copy-assets-litepaper')));

gulp.task('default', gulp.series('todo', gulp.parallel('bs', 'sass', 'watch:main')));
