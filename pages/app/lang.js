function lang_change(lang) {
    // ".elclass or #elclass^textEN",
    fetch('../../pages/app/lang.json')
        .then(r => r.json())
        .then(data => {
            let allData = data[lang] //change en or ru

            allData.forEach(el => {
                let id_or_class = el.slice(0, el.indexOf('^'))
                let text = el.slice(el.indexOf('^') + 1, el.length)
                get_and_changeText(id_or_class, text)
            })
        })

    function get_and_changeText(id_or_class, text) {
        // console.log(id_or_class, text);
        let ifOk = document.querySelectorAll(id_or_class)
        if (ifOk) {
            ifOk.forEach(el => {
                el.innerHTML = text
            })
        } else {
            console.error('could not find -> ', id_or_class);
        }
    }
}

let lang_storage = localStorage.getItem('language')
if (lang_storage) {
    let get_lang = JSON.parse(lang_storage)

    lang_change(get_lang.lang)
} else {
    lang_change('ru')
}