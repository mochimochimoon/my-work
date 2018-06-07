const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const ejs = require('gulp-ejs');
const browserSync = require('browser-sync').create();// メモリにキャッシュして変更だけを反映
const cache = require('gulp-cached');// sassで@import "~~/**"で一括読み込みできるようになる
const sassGlob = require('gulp-sass-glob');// CSSの圧縮
const cleanCSS = require('gulp-clean-css');// webpackをgulpで使うためのプラグイン
const webpack = require('webpack-stream');


gulp.task('ejs', () => {
  gulp.src('./src/ejs/page/**/[^_]*.ejs', {base: './src/ejs/page'})// baseはファイルの階層の基準となるところ
    .pipe(plumber())
    .pipe(ejs(null, {root: './src'}, {ext: '.html'}))// rootはルートディレクトリ,extはつける拡張子
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
  gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sassGlob()) // ignorePathで除外するファイルを設定できる
    .pipe(sass())
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(webpack({
      module: {
        loaders: [ // 変換のためのローダーについて
          {
            test: /\.js$/, // 対象となるファイル
            exclude: /node_modules/, // 除外するファイル
            loader: 'babel-loader', // 適用するローダー
            query: {
              presets: ['es2015'], // ローダーに渡すパラメータ
            },
          },
        ],
      },
      output: {
        filename: 'script.js', // 出力するファイル名
      },
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('image', () =>
  gulp.src('./src/images/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
);

gulp.task('serve', ['watch'], () => {
  browserSync.init({
    open: true, // サーバー起動時にページを開くか？また、開くURLを設定
    ghostMode: false, // ghostは操作の同期
    server: {
      baseDir: './dist',
    },
  });
});

gulp.task('watch', ['build'], () => {
  watch('./src/scss/**/*.scss', () => {
    gulp.start('sass');
  });
  watch('./src/ejs/**/*.ejs', () => {
    gulp.start('ejs');
  });
  watch('./src/images/**/*', () => {
    gulp.start('image');
  });
  watch('./src/js/**/*.js', () => {
    gulp.start('js');
  });
  watch('./dist/**', () => {
    browserSync.reload();
  });
});

gulp.task('build', ['ejs', 'sass', 'js', 'image']);
gulp.task('default', ['serve']);
