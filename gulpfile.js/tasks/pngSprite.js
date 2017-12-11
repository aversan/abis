if(!TASK_CONFIG.pngSprite) return

const browserSync = require('browser-sync')
const gulp        = require('gulp')
const filter      = require('gulp-filter')
const spritesmith = require('gulp.spritesmith')
const path        = require('path')

const pngSpriteTask = function() {

  const settings = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.icons.src, '*.png'),
    cssTemplate: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.icons.src, 'scss.template.handlebars'),
  	destStyle: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src),
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.icons.dest)
  }

    const filterSCSS = filter(['*.scss'], {restore: true});
    const filterPNG = filter(['*.png'], {restore: true});

  return gulp.src(settings.src)
	.pipe(spritesmith({
		// retinaSrcFilter: '*@2x.png',
		imgName: 'sprite.png',
		// retinaImgName: 'sprite@2x.png',
		cssName: '_sprite.scss',
		cssTemplate: settings.cssTemplate,
	}))
	.pipe(filterSCSS)
	.pipe(gulp.dest(settings.destStyle))
	.pipe(filterSCSS.restore)
	.pipe(filterPNG)
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

const { alternateTask = () => pngSpriteTask } = TASK_CONFIG.pngSprite
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG)
gulp.task('pngSprite', task)
module.exports = task
