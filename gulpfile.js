const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoPrefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require("gulp-image");
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del')
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(sourceMaps.init())
    .pipe(concat('main.css'))
    .pipe(autoPrefixes({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
   .pipe(htmlMin({collapseWhitespace: true
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
  .pipe(sourceMaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
    toplevel: true
  }).on('error', notify.onError()))
  .pipe(sourceMaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  })
}

watch('src/**/*.html', htmlMinify);
watch('src/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

exports.clean = clean
exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.images = images;
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)

const stylesBuild = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoPrefixes({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(dest('dist'))
}

const scriptsBuild = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
    toplevel: true
  }).on('error', notify.onError()))
  .pipe(dest('dist'))
}

exports.build = series(clean, resources, htmlMinify, scriptsBuild, stylesBuild, images, svgSprites, watchFiles)
