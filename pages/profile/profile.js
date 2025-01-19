let checking = {
    chack: true
}
// get and set user info

let set_lang = () => {
    let lang_storage = localStorage.getItem('language')
    let lang = 'ru'
    if (lang_storage) {
        let get_lang = JSON.parse(lang_storage)
        lang = get_lang.lang
        if (lang == 'ru')
            return ['language=ru-RU', 'name_' + lang]
        else if (lang == 'en')
            return ['language=en-EN', 'name_' + lang]
    } else {
        return ['language=ru-RU', 'name_' + lang]
    }
}

let language = set_lang()[0]

let get_user_info = () => {
    fetch('../../backend/profile.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json())
        .then(data => {
            document.querySelector('.user_first_letter').textContent = data.name[0]
            document.getElementById('_nameSurname').textContent = `${data.name} ${data.surname}`
            document.getElementById('_mail').textContent = `${data.email}`
            document.getElementById('_birthday').textContent = `${data.age.replaceAll('-', ' / ')}`
        })
        .catch(err => {
            console.error(err)
            window.location.href = '../../index.html'
        })
};
get_user_info()

// history
let history = () => {
    // get
    fetch('../../backend/get_historywatch.php', {
        method: 'post', headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json()).then(res => {
            // off 
            if (res.length) {
                let ID = [res.map(el => el[1])]
                history_drow(ID)

                document.querySelector('.history_text').classList.add('off')
            }
            //on
            else {
                let nuttons = document.querySelectorAll('.history-buttons')
                nuttons[0].classList.add('off')
                nuttons[1].classList.add('off')
                allLoaded()
            }
        })
        .catch(err => console.error('error -> ', err))

    // set
    function history_drow(move_id) {
        move_id[0].forEach((M_id, i) => {
            M_id = M_id.split('_')

            let
                new_id = M_id[0],
                movie_or_tv = M_id[1]

            fetch(`https://api.themoviedb.org/3/${movie_or_tv}/${new_id}?${language}&api_key=1cf50e6248dc270629e802686245c2c8`)
                .then(r => r.json())
                .then(res => {
                    let
                        title = res.title,
                        original_title = res.original_title,
                        release_date = res.release_date

                    if (movie_or_tv == 'tv') {
                        title = res.name
                        original_title = res.original_name
                        release_date = res.first_air_date
                    }

                    let swiperSlide = document.createElement('div')
                    swiperSlide.className = 'swiper-slide'
                    swiperSlide.id = new_id + '_' + movie_or_tv
                    swiperSlide.innerHTML = `
                        <span class='deleteMovie deleteMovie_History'>X</span>
                        <a href ="../watchMovie/watchMovie.html?${new_id}/${title}/${original_title}/${String(release_date).slice(0, 4)}/${movie_or_tv}">
                            <img src="https://image.tmdb.org/t/p/w500${res.poster_path}">
                            <p>${title.slice(0, title.indexOf(':'))}</p>
                        </a>`
                    document.getElementById('swiper_wrapper_history').appendChild(swiperSlide)

                    let el = document.getElementById('swiper_wrapper_history')
                    setTimeout(() => {
                        el.insertBefore(swiperSlide, el.firstChild);
                    }, 20);

                    if (i >= move_id[0].length - 1) {
                        setTimeout(() => {
                            delete_history()
                        }, 500);
                        allLoaded()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
    }
}
history()

// favorite
let favorite = () => {
    // get
    fetch('../../backend/get_bookmark.php', {
        method: 'post', headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json()).then(res => {
            // off
            if (res.length) {
                let ID = [res.map(el => el[1])]
                favorite_drow(ID)

                document.querySelector('.favorite_text').classList.add('off')
            }
            // on
            else {
                let nuttons = document.querySelectorAll('.favorite-buttons')
                nuttons[0].classList.add('off')
                nuttons[1].classList.add('off')
                allLoaded()
            }
        })
        .catch(err => console.log('error -> ', err))

    // set
    function favorite_drow(move_id) {
        move_id[0].forEach((M_id, i) => {
            M_id = M_id.split('_')

            let
                movie_or_tv = '',
                new_id = '';

            new_id = M_id[0]
            movie_or_tv = M_id[1]

            fetch(`https://api.themoviedb.org/3/${movie_or_tv}/${new_id}?${language}&api_key=1cf50e6248dc270629e802686245c2c8`)//?????
                .then(r => r.json())
                .then(res => {
                    let
                        title = res.title,
                        original_title = res.original_title,
                        release_date = res.release_date

                    if (movie_or_tv == 'tv') {
                        title = res.name
                        original_title = res.original_name
                        release_date = res.first_air_date
                    }

                    let swiperSlide = document.createElement('div')
                    swiperSlide.className = 'swiper-slide'
                    swiperSlide.id = new_id + '_' + movie_or_tv
                    swiperSlide.innerHTML = `
                                <span class='deleteMovie deleteMovie_favorite'>X</span>
                                <a href ="../watchMovie/watchMovie.html?${new_id}/${title}/${original_title}/${String(release_date).slice(0, 4)}/${movie_or_tv}">
                                    <img src="https://image.tmdb.org/t/p/w500${res.poster_path}">
                                    <p>${title.slice(0, title.indexOf(':'))}</p>
                                </a>`

                    let el = document.getElementById('swiper_wrapper_favorite')
                    setTimeout(() => {
                        el.insertBefore(swiperSlide, el.firstChild);
                    }, 20);
                    if (i >= move_id[0].length - 1) {
                        allLoaded()
                        setTimeout(() => {
                            delete_favorite()
                        }, 500);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
    };
}
favorite()

// swipper config
const swipperInti = () => {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            340: {
                slidesPerView: 2,
            },
            500: {
                slidesPerView: 3,
            },
            600: {
                slidesPerView: 4,
            },
            800: {
                slidesPerView: 5,
            },
            900: {
                slidesPerView: 6,
            },
            1050: {
                slidesPerView: 7,
            },
            1450: {
                slidesPerView: 9,
            },
            1900: {
                slidesPerView: 10,
            },
            2100: {
                slidesPerView: 11,
            },
            2400: {
                slidesPerView: 13,
            },
        }
    });
}

// click delete history
function delete_history() {
    // click delete move
    document.querySelectorAll('.deleteMovie_History').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.parentNode.id
            const delete_M = el.parentNode
            fetch('../../backend/remove_history.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(id),
            })
                .then(r => r.json()).then(response => {
                    console.log('ok -> History', response);
                    delete_M.remove()
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })
}

let delete_all_history = () => {
    document.querySelector('.clearAll_history').addEventListener('click', () => {
        fetch('../../backend/remove_history.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify('clearAll'),
        })
            .then(r => r.json()).then(response => {
                document.querySelectorAll('.deleteMovie_History').forEach(el => {
                    el.parentNode.remove()
                })
                // console.log('ok -> History', response);
            })
            .catch(err => {
                console.error('error -> ', err);
            });
    })
}
delete_all_history()

// click delete favorite
function delete_favorite() {
    document.querySelectorAll('.deleteMovie_favorite').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.parentNode.id
            const delete_M = el.parentNode

            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(id),
            })
                .then(r => r.json()).then(response => {
                    // console.log('ok -> favorite', response);
                    delete_M.remove()
                })
                .catch(err => {
                    console.error('error -> ', err);
                })
        })
    })

}
let delete_all_favorite = () => {
    document.querySelector('.clearAll_boockmark').addEventListener('click', () => {
        fetch('../../backend/bookmark.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify('clearAll'),
        })
            .then(r => r.json()).then(response => {
                document.querySelectorAll('.deleteMovie_favorite').forEach(el => {
                    el.parentNode.remove()
                })
                // console.log('ok -> boockmark', response);
            })
            .catch(err => {
                console.error('error -> ', err);
            });
    })
}
delete_all_favorite()

// all loaded
function allLoaded() {
    setTimeout(() => {
        if (checking.chack) {
            document.querySelector('.loader').style.display = 'none'
            swipperInti()

            checking.chack = false
        }
    }, 1500);
}

document.body.addEventListener('contextmenu', event => event.preventDefault());

// delete accaunt
function delete__acc() {
    const form_popup_wrapper = document.querySelector('.form_popup_wrapper')
    const form = document.querySelector('#delete_acc_form')
    form.addEventListener('click', (event) => {
        event.preventDefault();
        form_popup_wrapper.style.cssText = "display: flex;"
    })

    document.querySelector('.form_popup_btn_ok').addEventListener('click', () => { form.submit() })

    document.querySelector('.form_popup_btn_no').addEventListener('click', () => {
        form_popup_wrapper.style.cssText = "display: none;"
    })
}
delete__acc()