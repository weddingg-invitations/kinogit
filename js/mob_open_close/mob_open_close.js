document.getElementById('mob_open_close').addEventListener('click', () => {
    document.querySelector('.head-top-nav').classList.toggle('head-top-nav-active')
})

window.addEventListener('scroll', () => {
    if (scrollY > 150) {
        document.querySelector('.head-top-nav').classList.remove('head-top-nav-active')
    }
})