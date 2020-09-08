"use strict";

const {task, src, dest, watch, series} = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const jsuglify = require("gulp-uglify-es").default;

task("clean", function() {
  return del("build");
});

task("html", function () {
  return src("source/*.html")
    .pipe(htmlmin({collapseWhiteSpace: true}))
    .pipe(dest("build/"));
});

task("css", function () {
  return src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([autoprefixer()]))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(dest("build/css"))
  .pipe(server.stream());
});

task("js", function () {
  return src("source/js/*.js")
    .pipe(jsuglify())
    .pipe(dest("build/js"));
});

task("font", function () {
  return src("source/fonts/*.{woff,woff2}")
    .pipe(dest("build/fonts"));
});

task("images", function () {
  return src("source/img/*.{jpg,png,webp,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo(),
    ]))
    .pipe(dest("build/img"));
});

task("sprite", function () {
  return src("source/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true,
    }))
    .pipe(rename("sprite.svg"))
    .pipe(dest("build/img"));
});

task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  watch("source/sass/**/*.{scss,sass}", series("css")).on("change", server.reload);
  watch("source/*.html", series("html")).on("change", server.reload);
});

task("build", series(
    "clean",
    "html",
    "css",
    "js",
    "font",
    "images",
    "sprite"
  ));

task("start", series("build", "server"));
