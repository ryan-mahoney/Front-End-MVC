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
    //runSequence('mvc');
});

gulp.task('mvc', function (cb) {
    var version = uuid.v4();
    fs.writeFile('public/build/js/version.php', '<?php return "' + version + '";');
    gulp.src('public/build/js/mvc-*', {read: false}).pipe(clean());

    return gulp.src([
            'js/App.js',
            'public/build/js/templates.js',
            'public/build/js/helpers.js',
            'js/**/models/*.js',
            'js/**/views/*.js',
            'js/**/*Module.js',
            'js/**/*Controller.js',
            'js/**/*Router.js',
        ])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('mvc-' + version + '.js'))
        .pipe(browserify({
            //paths: ['./node_modules','./js/'],
            insertGlobals : false, 
            debug : false,
            /*
            shim: {
                serializeObject: {
                    path: 'public/vendor/jquery.serializeObject.min.js',
                    exports: 'serializeObject',
                    depends: {
                        jquery: '$'
                    }
                }
            }
            */
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('watch', function(cb) {
    gulp.watch('js/App.js', ['default']);
    gulp.watch('js/helpers/*.js', ['default']);
    gulp.watch('js/**/models/*.js', ['default']);
    gulp.watch('js/**/views/*.js', ['default']);
    gulp.watch('js/**/*Module.js', ['default']);
    gulp.watch('js/**/templates/*.hbs', ['default']);
    gulp.watch('js/**/helpers/*.hbs', ['default']);
});

gulp.task('templates', function(cb) {
    return gulp.src(['js/**/templates/*.hbs'])
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
            namespace: 'contents',
            root: 'Templates'
        }))
        .pipe(concatUtil('templates.js'))
        .pipe(concatUtil.header('var \n    Templates = require("app/library/Templates"),\n    Handlebars = require("handlebars");\n/* jshint ignore:start */\n'))
        .pipe(concatUtil.footer('\n/* jshint ignore:end */\nconsole.log("templates...");\nconsole.log(Templates);'))
        .pipe(clean({force: true}))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('clean', function (cb) {
    //return gulp.src(['public/build/js/templates.js', 'public/build/tmp/helpers/*', 'public/build/js/helpers.js'], {read: false}).pipe(clean());
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
    var files = glob.sync('js/**/helpers/*.js');
    files.map(process);

    var files = glob.sync('js/helpers/*.js');
    files.map(process);

    return gulp.src('js/**/helpers/*.js');
});

gulp.task('helpers-step-2', function (cb) {
    return gulp.src(['public/build/tmp/helpers/*.js'])
        .pipe(concatUtil('helpers.js', {separator: '\n\n'}))
        .pipe(concatUtil.header('var Handlebars = require("handlebars");\n\n/* jshint ignore:start */\n'))
        .pipe(concatUtil.footer('\n/* jshint ignore:end */'))
        .pipe(gulp.dest('public/build/js'));
});