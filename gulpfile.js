var browserify = require('gulp-browserify'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    handlebars = require('gulp-handlebars'),
    defineModule = require('gulp-define-module'),
    declare = require('gulp-declare'),
    runSequence = require('gulp-run-sequence'),
    fs = require('fs');

gulp.task('default', function(cb) {
    runSequence('templates', 'mvc', cb);
});

gulp.task('mvc', function (cb) {
    return gulp.src([
            'js/App.js',
            'public/build/js/templates.js',
            'js/modules/**/models/*.js',
            'js/modules/**/views/*.js',
            'js/modules/**/*.js'
        ])
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('mvc.js'))
        .pipe(browserify({
            insertGlobals : true, 
            debug : true,
            shim: {
                serializeObject: {
                    path: 'public/vendor/jquery.serializeObject.min.js',
                    exports: 'serializeObject',
                    depends: {
                        jquery: '$'
                    }
                }
            }
        }))
        .pipe(uglify())
        .pipe(clean({force: true}))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('watch', function(cb) {
    gulp.watch('js/App.js', ['mvc']);
    gulp.watch('public/build/js/templates.js', ['mvc']);
    gulp.watch('js/modules/**/models/*.js', ['mvc']);
    gulp.watch('js/modules/**/views/*.js', ['mvc']);
    gulp.watch('js/modules/**/*.js', ['mvc']);
    gulp.watch('js/modules/**/templates/*.hbs', ['templates']);
});

gulp.task('templates', function(cb) {
    return gulp.src(['js/modules/**/templates/*.hbs'])
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
            namespace: 'Templates',
            root: 'App'
        }))
        .pipe(concat('templates.js'))
        .pipe(clean({force: true}))
        .pipe(gulp.dest('public/build/js'));
});