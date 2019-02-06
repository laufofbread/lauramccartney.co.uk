/*!
 * gulp
 * $ npm install gulp-concat gulp-uglify gulp-rename gulp-ruby-sass gulp-clean-css gulp-notify gulp-autoprefixer gulp-watch gulp-imagemin gulp-cache gulp-webserver --save-dev
*/

var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		sass = require('gulp-ruby-sass'),
		minifycss = require('gulp-clean-css'),
		notify = require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer'),
		watch = require('gulp-watch'),
		imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache'),
		webserver = require('gulp-webserver');


gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
			fallback: './index.html'
    }));
});


gulp.task('scripts', function() {
    return gulp.src([
		'js/app.js'
    ])
    .pipe(concat('app.js'))
		.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
		.pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('styles', function() {
	return sass([
		'css/app.scss'
	])
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/'))
	.pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('images', function() {
	return gulp.src('img/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('img/'))
	.pipe(notify({ message: 'Images task complete' }));
});


gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('css/*.scss', gulp.parallel(['styles']));
	// Watch .js files
	gulp.watch('js/**/*.js', gulp.parallel(['scripts']));
});


gulp.task('default', gulp.series(['scripts', 'styles', 'images', gulp.parallel('serve', 'watch')],
function(done) {
	done();
}));
