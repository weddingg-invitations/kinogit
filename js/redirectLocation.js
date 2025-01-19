document.addEventListener("DOMContentLoaded", function () {
    var currentUrl = window.location.href;

    // Имена страниц, которые вы хотите удалить из URL
    var pagesToRemove = ["index.html"]; // Добавьте другие страницы, которые нужно удалить

    // Получение имени файла из URL и удаление пустых элементов
    var stringsToRemove = currentUrl.split("/").filter(function (part) {
        return pagesToRemove.includes(part); // Проверяем, есть ли часть URL в списке страниц для удаления
    });

    // Проход по каждой строке для удаления
    stringsToRemove.forEach(function (string) {
        currentUrl = currentUrl.replace("/" + string, "");
    });

    // Проверка наличия строк для удаления
    if (stringsToRemove.length > 0) {
        // Перенаправление на новый URL без указанных строк
        window.history.replaceState({}, document.title, currentUrl); // Заменяем текущий URL без перезагрузки страницы
    }
});