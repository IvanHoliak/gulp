import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

//Импорты для сжатия и оптимизации
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, "../assets/img/"))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            })
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })
        ))
        .pipe(app.gulp.dest(app.path.build.css)) //Получаем не сжатый файл (p.s. Если не нужно - закомментировать!)
        .pipe(app.plugins.if(
            app.isBuild,
            cleanCss()
        ))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css)) //Получаем основной сжатый файл 
        .pipe(app.plugins.browserSync.stream());
};

export default scss;