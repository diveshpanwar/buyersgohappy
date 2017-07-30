// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var minify = require('gulp-minifier');
var connect = require('gulp-connect');

//start the server
gulp.task('connect', function() {
  connect.server({
    name: 'Gulp Test',
    root: 'dist',
    port: 8000,
    host: 'localhost',
    livereload: true
  });
});
// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//minify all html, css, js
gulp.task('minifyall', function() {
  return gulp.src('dev/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('dist/'))
     .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('dev/js/*.js', ['lint','minifyall']);
    gulp.watch('dev/css/*.css', ['minifyall']);
    gulp.watch('dev/*.html', ['minifyall']);
});

// Default Task
gulp.task('default', ['lint','connect','watch','minifyall']);
