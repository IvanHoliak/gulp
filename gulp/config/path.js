import path from "path";

//Папка с проектом
const rootFolder = path.basename(path.resolve());

//Папка сборки
const buildFolder = "./dist";

//Папка исходников
const srcFolder = "./src";

const nodesPath = {
    build: {
        files: `${buildFolder}/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/assets/img/`,
        fonts: `${buildFolder}/fonts/`,
        svg: `${buildFolder}/assets/img/svg/`
    },
    src: {
        files: `${srcFolder}/**/*.*`,
        html: `${srcFolder}/pages/**/*.html`,
        scss: `${srcFolder}/styles/style.scss`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/assets/img/**/*.{jpg, jpeg, png, gif, webp}`,
        svg: `${srcFolder}/assets/img/svg/**/*.svg`,
        svgicons: `${srcFolder}/assets/img/svgicons/**/*.svg`,
    },
    watch: {
        files: `${srcFolder}/**/*.*`,
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/styles/**/*.{scss, css}`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/assets/img/**/*.{jpg, jpeg, png, gif, webp, svg, ico}`,
        svg: `${srcFolder}/assets/img/svg/**/*.svg`,
    },
    clean: buildFolder,
    buildFolder,
    srcFolder,
    rootFolder,
    ftp: ""
};

export default nodesPath;