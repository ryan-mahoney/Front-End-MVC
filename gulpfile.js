var browserify = require('gulp-browserify'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    handlebars = require('gulp-handlebars'),
    defineModule = require('gulp-define-module'),
    declare = require('gulp-declare'),
    runSequence = require('run-sequence'),
    uuid = require('node-uuid'),
    fs = require('fs');
    concatUtil = require('gulp-concat-util'),
    glob = require('glob'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

var environment = 'development';

var paths = {
    src: './js/app/',
    dest: './public/build/',
    vendor: './js/vendor/',
    assets: './assets/'
}

gulp.task('set-production', function() {
    environment = 'production';
});

gulp.task('default', function(cb) {
    runSequence('helpers-step-1', 'helpers-step-2', 'templates', 'mvc', 'clean', cb);
});

gulp.task('vendor', function (cb) {
    var stream = gulp.src([
        paths.vendor + 'jquery-2.1.1.js',
        paths.vendor + 'handlebars-v1.3.0.js',
        paths.vendor + 'underscore.js',
        paths.vendor + 'backbone.js',
        paths.vendor + 'backbone.wreqr.js',
        paths.vendor + 'backbone.babysitter.js',
        paths.vendor + 'backbone.marionette.js',
        paths.vendor + 'backbone.syphon.js',
    ])
    .pipe(concat('vendor.js'));

    stream.pipe(uglify());
    
    stream.pipe(gulp.dest(paths.dest + 'js'));

    return stream;
});

gulp.task('mvc', function (cb) {
    var version = uuid.v4();
    fs.writeFile(paths.dest + 'js/version.php', '<?php return "' + version + '";');
    fs.writeFile(paths.dest + 'js/version.json', '{"version": "' + version + '"}');
    gulp.src(paths.dest + 'js/mvc-*', {read: false}).pipe(clean());

    var stream = gulp.src([
        paths.dest + 'js/templates.js',
        paths.dest + 'js/helpers.js',
        paths.src + '**/*Module.js',
    ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('mvc-' + version + '.js'))
    .pipe(browserify({
        paths: ['./node_modules','./js/app'],
    }));
    if (environment == 'production') {
        stream.pipe(uglify());
    }
    stream
        .pipe(gulp.dest(paths.dest + 'js'))
        .pipe(rename('mvc.js'))
        .pipe(gulp.dest(paths.dest + 'js'))
    return stream;
});

gulp.task('watch', function(cb) {
    gulp.watch(paths.src + 'App.js', ['default']);
    gulp.watch(paths.src + 'Helpers/*.js', ['default']);
    gulp.watch(paths.src + '**/Models/*.js', ['default']);
    gulp.watch(paths.src + '**/Views/*.js', ['default']);
    gulp.watch(paths.src + '**/*Module.js', ['default']);
    gulp.watch(paths.src + '**/Templates/*.hbs', ['default']);
    gulp.watch(paths.src + '**/Helpers/*.hbs', ['default']);
    gulp.watch(paths.vendor + '/**/*.js', ['vendor']);
});

gulp.task('templates', function(cb) {
    return gulp.src([paths.src + '**/Templates/*.hbs'])
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
            namespace: 'templates',
            root: 'App'
        }))
        .pipe(concatUtil('templates.js'))
        .pipe(concatUtil.header('var App = require("App");\n/* jshint ignore:start */\n'))
        .pipe(concatUtil.footer('\n/* jshint ignore:end */\n'))
        .pipe(clean({force: true}))
        .pipe(gulp.dest(paths.dest + 'js'));
});

gulp.task('clean', function (cb) {
    return gulp.src([
        paths.dest + 'js/templates.js', 
        paths.dest + 'tmp/helpers/*', 
        paths.dest + 'js/helpers.js'
    ], {read: false}).pipe(clean());
});

gulp.task('helpers', function (cb) {
    runSequence('helpers-step-1', 'helpers-step-2', cb);
});

gulp.task('helpers-step-1', function (cb) {
    var process = function(file) {
        var name = file.split('/').pop().replace(/\.js$/, '');
        gulp.src(file)
            .pipe(concatUtil(name + '.js', {process: function (src) { return 'Handlebars.registerHelper("' + name + '", ' + src + ');'; }}))
            .pipe(gulp.dest(paths.dest + 'tmp/helpers'));
    };
    var files = glob.sync(paths.src + '**/Helpers/*.js');
    files.map(process);

    var files = glob.sync(paths.src + 'Helpers/*.js');
    files.map(process);

    return gulp.src(paths.src + '**/Helpers/*.js');
});

gulp.task('helpers-step-2', function (cb) {
    return gulp.src(paths.dest + 'tmp/helpers/*.js')
        .pipe(concatUtil('helpers.js', {separator: '\n\n'}))
        .pipe(concatUtil.header('/* jshint ignore:start */\n'))
        .pipe(concatUtil.footer('\n/* jshint ignore:end */'))
        .pipe(gulp.dest(paths.dest + 'js'));
});

gulp.task('production', ['set-production', 'vendor', 'default']);