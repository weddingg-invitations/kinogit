function lang_change(lang) {
    // ".elclass or #elclass^textEN",
    fetch('../../pages/series/lang.json')
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

    document.querySelector('.helper_text').style.cssText = 'opacity: 0;'
}

let langg = () => {
    // select open close
    const language_cont = document.getElementById('language_cont')
    const language_select = document.getElementById('language_select')

    language_cont.addEventListener('click', () => {
        language_select.classList.toggle('language_select-active')
    })

    // select lang 
    document.querySelectorAll('.language_select_cont').forEach(el => {
        el.addEventListener('click', () => {
            let imgpath = el.querySelector('img').src
            let lang = el.getAttribute('lang')

            language_cont.querySelector('img').src = imgpath
            language_select.classList.remove('language_select-active')

            localStorage.setItem('language', JSON.stringify({ 'lang': lang, 'imgpath': imgpath }))
            location.reload();
        })
    })

    let lang_storage = localStorage.getItem('language')
    if (lang_storage) {
        let get_lang = JSON.parse(lang_storage)

        language_cont.querySelector('img').src = get_lang.imgpath
        lang_change(get_lang.lang)
    } else {
        lang_change('ru')
    }
}

langg()