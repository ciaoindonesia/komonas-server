"use strict";

var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
    return gulp
        .src(['app.ts', 'models/*.ts',  'controllers/*.ts', 'apis/*.ts', 'common/*.ts'], { base: '.' })
        .pipe(tsProject())
        .js.pipe(gulp.dest('.'));
});