const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*+(scss|sass)")
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('concat-js', () => {
    return gulp.src([
        'src/js/jquery.min.js',
        'src/js/popper.min.js',
        'src/js/bootstrap.min.js',
        'src/js/slick.min.js',
        'src/js/jquery.validate.min.js',
        'src/js/jquery.maskedinput.min.js',
        'src/js/wow.min.js',
        'src/js/functions.js',
        'src/js/app.js'
    ])
        .pipe(concat('index.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe((gulp.dest('src/js/')))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*html").on('change', browserSync.reload);
    gulp.watch(['src/js/*.js', '!src/js/index.min.js'], gulp.parallel('concat-js'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'concat-js', 'styles'));