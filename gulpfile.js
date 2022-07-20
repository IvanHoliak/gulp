//Основной модуль
import gulp from "gulp";

//Импорт путей
import nodesPath from "./gulp/config/path.js";

//Импорт общих плагинов
import plugins from "./gulp/config/plugins.js";

//Глобальная переманная
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    gulp,
    path: nodesPath,
    plugins
};

//Импорт задач
import reset from "./gulp/tasks/reset.js";
import html from "./gulp/tasks/html.js";
import server from "./gulp/tasks/server.js";
import scss from "./gulp/tasks/scss.js";
import js from "./gulp/tasks/js.js";
import images from "./gulp/tasks/images.js";
import svg from "./gulp/tasks/svg.js";
import svg_sprite from "./gulp/tasks/svg_sprite.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./gulp/tasks/fonts.js";

//Последовательная обраборка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const main_tasks = gulp.series(fonts, gulp.parallel(html, scss, js, images, svg, svg_sprite)); //html, scss, js, images, svg_sprite

//Наблюдение за изменениями
const watcher = () => {
    gulp.watch(nodesPath.watch.html, html);
    gulp.watch(nodesPath.watch.scss, scss);
    gulp.watch(nodesPath.watch.js, js);
    gulp.watch(nodesPath.watch.images, images);
    gulp.watch(nodesPath.watch.svg, svg);
};

//Режим разработки
const dev_server = gulp.parallel(watcher, server); //watcher, server
const dev = gulp.series(
    reset, 
    main_tasks, 
    dev_server
);

//Режим финальной сборки
const build = gulp.series(
    reset,
    main_tasks
);

//Выполнение сценариев по умолчанию
gulp.task("dev", dev);
gulp.task("build", build);