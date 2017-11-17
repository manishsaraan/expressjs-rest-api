const gulp = require('gulp'),
      nodemon = require('gulp-nodemon');

gulp.task('default', () => {
      nodemon({
      	 script : './index.js',
      	 ext : 'js',
      	 env: {
      	 	 PORT: 8000
      	 }
      })
      .on('restart', () => {
      	 console.log('restaring...');
      })
});
