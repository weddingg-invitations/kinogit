
global__scripts()
function global__scripts() {
    // scroll effect 
    let arrow_to_top = document.getElementById('arrow_to_top')
    if (arrow_to_top) {
        window.addEventListener('scroll', () => {
            if (scrollY > 450) {
                arrow_to_top.style.cssText = 'right:20px'
            } else {
                arrow_to_top.style.cssText = 'right:-60px'
            }
        })

        arrow_to_top.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    }

    // cookie_popup()
    // function cookie_popup() {
    //     if (document.getElementById('showMassag_cookie_on')) {
    //         let showMassag_cookie_popup = document.querySelector('.showMassag_cookie_popup')
    //         // showMassag_cookie_popup.style.display = 'none'//???

    //         if (localStorage.getItem('cookie_ok')) {
    //             showMassag_cookie_popup.style.display = 'none'
    //         }

    //         let on = document.getElementById('showMassag_cookie_on')
    //         let off = document.getElementById('showMassag_cookie_off')

    //         on.addEventListener('click', () => {
    //             localStorage.setItem('cookie_ok', 1)
    //             showMassag_cookie_popup.style.display = 'none'
    //         })

    //         off.addEventListener('click', () => {
    //             localStorage.setItem('cookie_ok', 1)
    //             showMassag_cookie_popup.style.display = 'none'
    //         })
    //     }
    // }
}