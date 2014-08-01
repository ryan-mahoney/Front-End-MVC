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
    runSequence = require('run-sequence'),
    uuid = require('node-uuid'),
    fs = require('fs');
    concatUtil = require('gulp-concat-util'),
    glob = require('glob'),
    path = require('path'),
    plumber = require('gulp-plumber');

gulp.task('default', function(cb) {
    runSequence('helpers-step-1', 'helpers-step-2', 'templates', 'mvc', 'clean', cb);
});

gulp.task('mvc', function (cb) {
    var version = uuid.v4();
    fs.writeFile('public/build/js/version.php', '<?php return "' + version + '";');
    gulp.src('public/build/js/mvc-*', {read: false}).pipe(clean());

    return gulp.src([
            'js/App.js',
            'public/build/js/templates.js',
            'public/build/js/helpers.js',
            'js/modules/**/models/*.js',
            'js/modules/**/views/*.js',
            'js/modules/**/*Module.js'
        ])
        .pipe(plumber())
        .pipe(jshint())
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
    gulp.watch('js/helpers/*.js', ['default']);
    gulp.watch('js/modules/**/models/*.js', ['default']);
    gulp.watch('js/modules/**/views/*.js', ['default']);
    gulp.watch('js/modules/**/*Module.js', ['default']);
    gulp.watch('js/modules/**/templates/*.hbs', ['default']);
    gulp.watch('js/modules/**/helpers/*.hbs', ['default']);
});

gulp.task('templates', function(cb) {
    return gulp.src(['js/modules/**/templates/*.hbs'])
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
            namespace: 'Templates',
            root: 'App'
        }))
        .pipe(concatUtil('templates.js'))
        .pipe(concatUtil.header('/* jshint ignore:start */\n'))
        .pipe(concatUtil.footer('\n/* jshint ignore:end */'))
        .pipe(clean({force: true}))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('clean', function (cb) {
    return gulp.src(['public/build/js/templates.js', 'public/build/tmp/helpers/*', 'public/build/js/helpers.js'], {read: false}).pipe(clean());
});

gulp.task('helpers', function (cb) {
    runSequence('helpers-step-1', 'helpers-step-2', cb);
});

gulp.task('helpers-step-1', function (cb) {
    var process = function(file) {
        var name = file.split('/').pop().replace(/\.js$/, '');
        gulp.src(file)
            .pipe(concatUtil(name + '.js', {process: function (src) { return 'Handlebars.registerHelper("' + name + '", ' + src + ');'; }}))
            .pipe(gulp.dest('public/build/tmp/helpers'));
    };
    var files = glob.sync('js/modules/**/helpers/*.js');
    files.map(process);

    var files = glob.sync('js/helpers/*.js');
    files.map(process);

    return gulp.src('js/modules/**/helpers/*.js');
});

gulp.task('helpers-step-2', function (cb) {
    return gulp.src(['public/build/tmp/helpers/*.js'])
        .pipe(concatUtil('helpers.js', {separator: '\n'}))
        .pipe(gulp.dest('public/build/js'));
});