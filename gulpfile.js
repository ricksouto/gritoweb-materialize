//dependencies
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    rename        = require('gulp-rename'),
    minifyCss     = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    sourcemaps    = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify-es').default;

//js path
var jsfiles = '_assets/js/**/*.js';

//generate css
gulp.task('sass', function(){
    gulp.src('_assets/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 40 versions']
      }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('css/'))
      .pipe(minifyCss())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css/'));
});

//generate js
gulp.task('scripts', function (){
  return gulp.src(jsfiles)
    .pipe(sourcemaps.init())
    .pipe(rename('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//watch funcions
gulp.task('watch', function(){
  gulp.watch('_assets/scss/**/*.scss', ['sass']);
  gulp.watch(jsfiles, ['scripts']);
});

//browser sync
gulp.task('sync', function(){
  browserSync.init({
    proxy: 'localhost/sitename'
  });
  gulp.watch('**/*.php').on('change', browserSync.reload);
  gulp.watch('dist/js/*.js').on('change', browserSync.reload);
  gulp.watch('css/style.css').on('change', browserSync.reload);
});
