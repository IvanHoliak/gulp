import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, "assets/img/"))
        .pipe(app.plugins.replace(/@scss\//g, "css/"))
        .pipe(app.plugins.replace(/@js\//g, "js/"))
        .pipe(app.plugins.if(
            app.isBuild,
            webpHtmlNoSvg()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            versionNumber({
                value: "%DT%",
                append: {
                    key: "_v",
                    cover: 0,
                    to: ["css", "js"]
                },
                output: {
                    file: "gulp/version.json"
                }
            })
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            htmlmin({
                collapseWhitespace: true,
            })
        ))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream());
};

export default html;