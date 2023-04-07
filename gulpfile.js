import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import browserSync from "browser-sync";
import GulpUglify from "gulp-uglify";
const sass = gulpSass(dartSass);

// Server
gulp.task("server", function () {
    browserSync({
        server: {
            baseDir: "dist",
        },
    });
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Reload on change
gulp.task("watch", function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", gulp.parallel("html"));
    gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
});

// Styles
gulp.task("styles", function () {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Minify HTML
gulp.task("html", function () {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

// Minify images
gulp.task("images", function () {
    return gulp
        .src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))
        .pipe(browserSync.stream());
});

// Copy scripts
gulp.task("scripts", function () {
    return gulp
        .src("src/js/**/*")
        .pipe(GulpUglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Copy favicon
// gulp.task("favicon", function () {
//     return gulp
//         .src("src/favicon/**/*")
//         .pipe(gulp.dest("dist/favicon"))
//         .pipe(browserSync.stream());
// });

//Parallel tasks
gulp.task(
    "default",
    gulp.parallel("watch", "server", "styles", "html", "images", "scripts")
);
