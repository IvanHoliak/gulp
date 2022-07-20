//Проверка поддержки браузером формата картинок .webp
const isWebp = () => {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    };

    testWebP(function (support) {
        const className = support ? "webp" : "no-webp";
        document.documentElement.classList.add(className);
    });
};

export default isWebp;
