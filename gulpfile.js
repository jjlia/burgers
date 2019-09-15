const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const px2rem = require("gulp-smile-px2rem");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

const { DIST_PATH, STYLES_LIBS, JS_LIBS } = require("./gulp.config");

sass.compiler = require("node-sass");

task("clean", () => {
  console.log(env);
  return src("dist/**/*", { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src("*.html")
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src("img/**/*")
    .pipe(dest("dist/images/img"))
    .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
  return src("fonts/*")
    .pipe(dest("dist/fonts"))
    .pipe(reload({ stream: true }));
});

task("styles", () => {
  return src([...STYLES_LIBS, "css/main.scss"])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(px2rem())
    .pipe(
      gulpif(
        env === "prod",
        autoprefixer({
          browserslistrc: ["last 2 versions"],
          cascade: false
        })
      )
    )
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("scripts", () => {
  return src([...JS_LIBS, "js/*.js"])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"]
        })
      )
    )
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});


task("icons", () => {
  return src("/icons/*.svg")
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: "(fill|stroke|style|width|height|data.*)"
            }
          }
        ]
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(dest("dist/icons"));
});

task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "/dist"
    },
    open: false
  });
});

task("watch", () => {
  watch("css/**/*.scss", series("styles"));
  watch("*.html", series("copy:html"));
  watch("js/*.js", series("scripts"));
  watch("icons/*.svg", series("icons"));
  watch("img/**/*.{png,jpg}", series("copy:img"));
  watch("fonts/*.{woff,woff2}", series("copy:fonts"));
});

task(
  "default",
  series(
    "clean",
    parallel(
      "copy:html",
      "styles",
      "scripts",
      "icons",
      "copy:img",
      "copy:fonts"
    ),
    parallel("watch", "browser-sync")
  )
);

task(
  "build",
  series(
    "clean",
    parallel(
      "copy:html",
      "styles",
      "scripts",
      "icons",
      "copy:img",
      "copy:fonts"
    )
  )
);

// exports.css = css;
// exports.default = parallel(css);
