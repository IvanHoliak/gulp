import webp from "gulp-webp";
import imageMin from "gulp-imagemin";

const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(app.plugins.if(
            app.isBuild,
            webp()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.images)
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            app.gulp.src(app.path.src.images)
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.images)
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            imageMin({
                progressive: true,
                svgoPlugins:[{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 //0 to 7
            })
        ))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream());
};

export default images;