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
    uuid = require('node-uuid'),
    fs = require('fs');

gulp.task('default', function(cb) {
    runSequence('templates', 'mvc', 'clean', cb);
});

gulp.task('mvc', function (cb) {
    var version = uuid.v4();
    fs.writeFile('public/build/js/version.php', '<?php return "' + version + '";');
    gulp.src('public/build/js/mvc-*', {read: false}).pipe(clean());
        
    return gulp.src([
            'js/App.js',
            'public/build/js/templates.js',
            'js/modules/**/models/*.js',
            'js/modules/**/views/*.js',
            'js/modules/**/*.js'
        ])
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('mvc-' + version + '.js'))
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
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('watch', function(cb) {
    gulp.watch('js/App.js', ['default']);
    gulp.watch('public/build/js/templates.js', ['default']);
    gulp.watch('js/modules/**/models/*.js', ['default']);
    gulp.watch('js/modules/**/views/*.js', ['default']);
    gulp.watch('js/modules/**/*.js', ['default']);
    gulp.watch('js/modules/**/templates/*.hbs', ['default']);
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

gulp.task('clean', function (cb) {
    return gulp.src(['public/build/js/templates.js'], {read: false}).pipe(clean());
});