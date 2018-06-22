const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const ejs = require('gulp-ejs');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cached'); // メモリにキャッシュして変更だけを反映
const sassGlob = require('gulp-sass-glob'); // importでワイルドカード
const wait =require('gulp-wait'); // VSCバグ用
const cleanCSS = require('gulp-clean-css'); // CSS圧縮
const webpack = require('webpack-stream'); // webpackをgulpで使う
const named = require('vinyl-named');

const outputDir = 'dist';
const srcDir = 'src';

gulp.task('ejs', () => {
  return gulp.src(
    './src/ejs/page/**/[^_]*.ejs',
    {base: './src/ejs/page'} // baseはファイル階層の基準
  )
    .pipe(plumber())
    .pipe(ejs(null, {root: './src'}, {ext: '.html'}))// rootはルート,extは拡張子
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
  return gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sassGlob()) // ignorePathで除外するファイルを設定できる
    .pipe(wait(500)) // 遅延しないとVSCでバグる
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

gulp.task('image', () => {
  return gulp.src('./src/images/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('react', () => {
  return gulp.src(srcDir + '/react/**/[^_]*', {base: srcDir + '/react'})
    .pipe(plumber())
    .pipe(named(function(file) { // jsを複数ファイル分けて変換・ディレクトリ維持用関数
      return file.relative.replace(/\.[^\.]+$/, '');
    }))
    .pipe(webpack({
      module: {
        loaders: [ // 変換のためのローダーについて
          {
            test: /\.js$/, // 対象となるファイル
            exclude: /node_modules/, // 除外するファイル
            loader: 'babel-loader', // 適用するローダー
            query: {
              presets: ['react', 'es2015'], // ローダーに渡すパラメータ
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest(outputDir + '/react'));
});

gulp.task('serve', ['watch'], () => {
  browserSync.init({
    open: true, // サーバー起動時にページを開くか？また、開くURLを設定
    ghostMode: false, // ghostは操作の同期
    server: {
      baseDir: './dist',
      directory: true,
    },
  });
});

gulp.task('watch', ['build'], () => {
  watch('src/sass/**/*.scss', () => {
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
  watch(srcDir + '/react/**/*.js', () => {
    gulp.start('react');
  });
  watch('./dist/**', () => {
    browserSync.reload();
  });
});

gulp.task('build', ['ejs', 'sass', 'js', 'image', 'react']);
gulp.task('default', ['serve']);
