const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulp_mocha = require('gulp-mocha');

gulp.task('default', () => {
        nodemon({
          script: './index.js',
            ext: 'js',
            env: {
            PORT: 8001
          },
            ignore: './node_modules/**'
          })
          .on('restart', () => {
            console.log('restaring...');
        });
});

gulp.task('test', () => {     
     gulp.src('tests/*.js')
         .pipe(gulp_mocha({reporter : 'nyan'}))

});
