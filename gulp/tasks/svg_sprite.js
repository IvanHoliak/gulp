import svgSprite from "gulp-svg-sprite"

const svg_sprite = () => {
    return app.gulp.src(app.path.src.svgicons, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images));
};

export default svg_sprite;