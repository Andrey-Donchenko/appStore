const gulp = require('gulp'),
	server = require('gulp-server-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
	useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    minifyCss = require('gulp-clean-css'),
    cleanDest = require('gulp-clean-dest');
 
gulp.task('serve', () => {
  gulp.src('src')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

gulp.task('babel', () => {
    return gulp.src('src/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'minify']
        }))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('views', () => {
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('mini', () => {
    return gulp.src('src/*.html')
        .pipe(cleanDest('dist'))
        .pipe(htmlreplace({
            'js': 'js/all.min.js'
        }))
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
})

gulp.task('build', ['mini', 'images', 'fonts', 'views', 'babel']);