'use strict';

// モジュールをロード
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('jade');
const gulpJade = require('gulp-jade');
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload;
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');

// nodeをデバッグモードで起動
gulp.task('nodemon', function(cb) {
  var called = false;

  return nodemon({
    script: 'server.js',
    // 監視するファイルの拡張子
    ext: 'js',
    ignore: ['./app', 'node_modules']
  })

  .on('start', function() {
    // サーバー起動時
    if (!called) {
      called = true;
      cb();
    }
  })

  .on('restart', function() {
    // サーバー再起動時
    setTimeout(function() {
      reload();
    }, 500);
  });
});

// browsersync: 自動リロード
gulp.task('reload', function() {
  browserSync.reload();
});

// 静的サーバーの立ち上げとファイルの監視
// 同時にsassとjadeをコンパイル
gulp.task('default', ['nodemon', 'browserify', 'sass', 'jade', 'image'], function() {

  // rootを指定
  browserSync.init({
    proxy: 'localhost:3000',
    port: 37000
  });

  // 監視対象
  gulp.watch('app/styles/*.scss', ['sass']);
  gulp.watch('app/jade/*.jade', ['jade']);
  gulp.watch('app/scripts/*.js', ['browserify']);
  gulp.watch('.tmp/app/*.js', ['reload']);
  gulp.watch('.tmp/app/styles/*.css', ['reload']);
  gulp.watch('.tmp/app/*.html', ['reload']);
});

// browserify
gulp.task('browserify', function() {
  browserify('app/scripts/app.js', {
    debug: true
  })

  .transform(babelify)
    .bundle()
    // エラーメッセージを出力
    // errorを出力しないとgulpが落ちる
    .on('error', function(err) {
      console.log('Error : ' + err.message);
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('.tmp/app'));
});

// scss
gulp.task('sass', function() {
  // 対象のファイルが変更されたときに実行
  gulp.src('app/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    // ソースマップ出力
    .pipe(sourcemaps.write('../maps'))
    // 出力先
    .pipe(gulp.dest('.tmp/app/styles'));
});

// jade
gulp.task('jade', function() {
  // 対象のファイルが変更されたときに実行
  gulp.src('app/jade/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    // 出力先
    .pipe(gulp.dest('.tmp/app'));
});

// 画像を.tmpにコピー
gulp.task('image', function() {
  gulp.src('app/images/**')
    .pipe(gulp.dest('.tmp/app/images'));
});