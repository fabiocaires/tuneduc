var gulp =      require('gulp'),
    sass =      require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    prefixer =  require('gulp-autoprefixer'),
    uglify =    require('gulp-uglify'),
    concat =    require('gulp-concat'),
    imagemin =  require('gulp-imagemin'),
    rename =    require('gulp-rename'),
    notify =    require('gulp-notify');

gulp.task('styles', function(){
    return sass('src/styles/main.scss', { style: 'expanded' })
        .pipe(prefixer('last 3 version'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(notify({ message: 'Sass task complete' }));
});

gulp.task('scripts', function(){
    return gulp.src('src/js/**/*.js') 
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/assets/css/fonts'))
    .pipe(notify({ message: 'Fonts task complete' }));
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images', 'fonts');
});