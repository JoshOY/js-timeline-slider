(function(){
  'use strict';

  var gulp = require('gulp');
  // Gulp Components
  var jshint = require('gulp-jshint');
  var stylus = require('gulp-stylus');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var browserSync = require('browser-sync').create();
  var minify = require('gulp-minify');

  // Compile stylus
  gulp.task('stylus', function() {
    gulp.src('./src/css/*.styl')
      .pipe(jshint())
      .pipe(sourcemaps.init())
      .pipe(stylus()).on('error', onError)
      // .pipe(uglify())
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('./dist/css'))
      ;
  })

  gulp.task('babel', function() {
    gulp.src(['./src/js/*.js', './src/js/*.es6'])
      .pipe(jshint())
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['es2015'] })).on('error', onError)
      // .pipe(uglify())
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('./dist/js'));
  });

  gulp.task('browser-sync', function () {
    var files = [
      './*.html',
      'dist/css/*.css',
      'dist/js/*.js',
      'resources/*'
    ];

    browserSync.init(files, {
      ui: {
        port: 8077
      },
      server: {
        baseDir: '.',
        index: 'demo.html',
        routes: {
          "/bower_components": "bower_components"
        },
        middleware: function (req, res, next) {
          console.log("Running through browser-sync...");
          next();
        }
      },
      debug: true
    });
    
  });

  gulp.task('minify', function() {
    gulp.src('./dist/css/*.css')
      .pipe(uglify()).on('error', onError)
      .pipe(rename({ suffix: '-min' }))
      .pipe(gulp.dest('./dist/minify'));
    gulp.src('./dist/js/*.js')
      .pipe(uglify()).on('error', onError)
      .pipe(rename({ suffix: '-min' }))
      .pipe(gulp.dest('./dist/minify'));
  });

  
  gulp.task('build', ['stylus', 'babel', 'browser-sync']);
  gulp.task('default', ['build', 'watch']);
  gulp.task('pack', ['stylus', 'babel', 'minify']);
  gulp.task('watch', function() {
    var stream = gulp.watch(
      ['./*.html', './src/css/*.styl', './src/js/*.js'], 
      ['build', 'watch'],
      function (event) {
         console.log('Event type: ' + event.type); // added, changed, or deleted
         console.log('Event path: ' + event.path); // The path of the modified file
      }
    );
    stream.on('error', function() {});
  });

  function onError(err) {
    console.log(err);
    this.emit('end');
  }

})();