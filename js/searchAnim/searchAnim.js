let search = document.getElementById('search')
let search_input = document.getElementById('search_inp')
let search_close = document.getElementById('search-close')
let search_buttone = document.getElementById('search_btn')
let search_cont = document.getElementById('search_cont')

search_buttone.addEventListener('click', () => {
    go_to_movies()
})

search_input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter')
        go_to_movies()
})

function go_to_movies() {
    document.querySelector('.head-top-nav').classList.remove('head-top-nav-active')
    if (search_input.value) {
        setTimeout(() => {
            document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
        }, 450)
    }
}

search_close.addEventListener('click', () => {
    if (search_cont) {
        search_cont.classList.toggle('search_cont_animate')
    }
    search.classList.toggle('search-anime-inp')
    search_close.classList.toggle('search-anime-close')
    search_buttone.classList.toggle('search-btn-active')
    search_input.classList.toggle('search_input-active')
    search.offsetWidth < 50 ? search_input.focus() : false;

    if (document.getElementById('search__films__cont')) {
        search__films__cont.innerHTML = ''
        document.getElementById('search__films__cont').classList.toggle('search__films__cont--off')
    }
})

search_buttone.addEventListener('click', () => {
    if (search_cont) {
        search_cont.classList.toggle('search_cont_animate')
    }
    search.classList.remove('search-anime-inp')
    search_close.classList.remove('search-anime-close')
    search_buttone.classList.remove('search-btn-active')
    search_input.classList.remove('search_input-active')
    search.offsetWidth < 50 ? false : search_input.blur();

    if (document.getElementById('search__films__cont')) {
        search__films__cont.innerHTML = ''
        document.getElementById('search__films__cont').classList.add('search__films__cont--off')
    }
})

window.addEventListener('scroll', () => {
    if (scrollY > 800) {
        if (search_cont) {
            search_cont.classList.toggle('search_cont_animate')
        }
        search.classList.remove('search-anime-inp')
        search_close.classList.remove('search-anime-close')
        search_buttone.classList.remove('search-btn-active')
        search_input.classList.remove('search_input-active')
        search.offsetWidth < 50 ? false : search_input.blur();

        if (document.getElementById('search__films__cont')) {
            search__films__cont.innerHTML = ''
            document.getElementById('search__films__cont').classList.add('search__films__cont--off')
        }
    }
})