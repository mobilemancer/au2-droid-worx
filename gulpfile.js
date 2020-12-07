const gulp = require('gulp');
const dumber = require('gulp-dumber');
const au2 = require('@aurelia/plugin-gulp').default;
const fs = require('fs');
const typescript = require('gulp-typescript');
const plumber = require('gulp-plumber');
const merge2 = require('merge2');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const del = require('del');
const devServer = require('./dev-server');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const dist = 'dist';

const dr = dumber({
  baseUrl: isProduction ? '/' : '/' + dist,
  hash: false,
  codeSplit: isTest ? undefined : function (moduleId, packageName) {
    if (!packageName) return 'app-bundle';
  },
  onManifest: isTest ? undefined : function (filenameMap) {
    console.log('Update index.html with ' + filenameMap['entry-bundle.js']);
    const indexHtml = fs.readFileSync('_index_dev.html').toString()
      .replace('entry-bundle.js', filenameMap['entry-bundle.js']);
    fs.writeFileSync('index.html', indexHtml);

    const indexHtmlProd = fs.readFileSync('_index.html').toString()
      .replace('entry-bundle.js', filenameMap['entry-bundle.js']);
    fs.writeFileSync('dist/index.html', indexHtmlProd);
  }
});

function buildJs(src) {
  const ts = typescript.createProject('tsconfig.json', { noEmitOnError: true });
  return gulp.src(src, { sourcemaps: !isProduction })
    .pipe(gulpif(!isProduction && !isTest, plumber()))
    .pipe(au2())
    .pipe(ts());
}

function buildHtml(src) {
  return gulp.src(src)
    .pipe(gulpif(!isProduction && !isTest, plumber()))
    .pipe(au2());
}

function buildCss(src) {
  return gulp.src(src, { sourcemaps: !isProduction })
    .pipe(postcss([
      autoprefixer(),
      postcssUrl({ url: 'inline', encodeType: 'base64' })
    ]));
}

function build() {
  return merge2(
    gulp.src('src/**/*.json'),
    buildJs('src/**/*.ts'),
    buildHtml('src/**/*.html'),
    buildCss('src/**/*.css'))
    .pipe(dr())
    .pipe(gulpif(isProduction, terser({ compress: false })))
    .pipe(gulp.dest(dist, { sourcemaps: isProduction ? false : '.' }))
    .pipe(gulp.src("./index.html").pipe(gulp.dest("./dist/")));
}

function clean() {
  return del(dist);
}

function clearCache() {
  return dr.clearCache();
}

const serve = gulp.series(
  build,
  function startServer(done) {
    devServer.run({
      open: !process.env.CI,
      port: 9000
    });
    done();
  }
)

function reload(done) {
  console.log('Reloading the browser');
  devServer.reload();
  done();
}

function watch() {
  gulp.watch('src/**/*', gulp.series(build, reload));
}

const run = gulp.series(clean, serve, watch);

exports.build = build;
exports.clean = clean;
exports['clear-cache'] = clearCache;
exports.run = run;
exports.default = run;
