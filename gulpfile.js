const { parallel, watch, dest, src, series } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

function css() {
  return src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('./css'))
    .pipe(reload({stream: true}));
}

function compileCss() {
  return src('./scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('styles.css'))
    .pipe(dest('./dist/css'));
}

function copyHtml() {
  return src('index.html')
    .pipe(dest('./dist'));
}

function copyImages() {
  return src('./images')
    .pipe(dest('./dist'));
}

function copyFavicon() {
  return src('./favicon-16x16.png')
    .pipe(dest('./dist'));
}

function cleanDist() {
  return src('./dist', { allowEmpty: true })
    .pipe(clean());
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
exports.build = series(
  cleanDist,
  parallel(
    compileCss,
    copyHtml,
    copyImages,
    copyFavicon,
  ),
);

