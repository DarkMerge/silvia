const sass = require('gulp-sass');
const { parallel, watch, dest, src, series } = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

sass.compiler = require('node-sass');

function css() {
  return src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('./css'))
    .pipe(reload({stream: true}));
}

function server() {
  browserSync({
    server: {
      baseDir: '.'
    },
    open: true,
    notify: false,
    watch: 'index.html',
  });
  watch('./scss/**/*.scss', css);
}

exports.server = server;

