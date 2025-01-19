let lication = decodeURI(window.location.search)

let get_move_data = lication.slice(1, lication.length).split('/')

let movie_id = get_move_data[0]
let title_ru = get_move_data[1] ? get_move_data[1] : ''
let title_original = get_move_data[2] ? get_move_data[2] : ''
let yearr = get_move_data[3]

kinoboxTv(movie_id, title_ru, title_original, yearr)

let move_data = `${title_ru} ${title_original} ${yearr}`


document.querySelectorAll('.kinoplayer').forEach(players => {
    players.setAttribute('data-title', move_data)
})

document.getElementById('global_title').textContent = move_data

// select player
let slect_player_btn = document.querySelectorAll('.slect-player-btn')

slect_player_btn.forEach((el, i) => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.video-players').forEach((off, off_i) => {
            slect_player_btn[off_i].classList.remove('slect-player-btn-active')
            off.classList.remove('video-player-active')
        })

        el.classList.add('slect-player-btn-active')
        document.querySelectorAll('.video-players')[i].classList.add('video-player-active')
        if (!document.querySelector('.video-player-active>div>div')) {
            setTimeout(() => {
                document.querySelector('.slect-player-btn-active').click()
            }, 300);
        }
    })
})

setTimeout(() => {
    if (document.querySelector('.slect-player-btn-active')) {
        document.querySelector('.slect-player-btn-active').click()
    }
    let kinoplayertop = document.getElementById('kinoplayertop')
    let get_width = parseInt(getComputedStyle(kinoplayertop).getPropertyValue('width'))
    let get_height = parseInt(getComputedStyle(kinoplayertop).getPropertyValue('height'))

    document.querySelector('.players-cont').style.cssText = `width:${get_width}px; height:${get_height}px`
}, 1500)

// kinobox player settings
function kinoboxTv(movie_id, title_ru, title_original, yearr) {
    let movie = 'film'

    if (decodeURI(lication).match('tv'))
        movie = 'series'

    kbox('.kinobox_player', {
        search: {
            // kinopoisk: '258687', // Поиск фильма по ID Кинопоиска
            // imdb: 'tt0816692',   // Поиск фильма по IMDb Id
            tmdb: Number(movie_id),     // Поиск фильма по IMDb Id
            title: title_ru,        // ru title
            alternativeTitle: title_original, //original title
            year: yearr,            //2024
            type: movie,            //type Film, Series'
        },
        menu: {
            enable: true, // Показывать меню
            default: 'menu_list', // Вид меню для стандартных устройств
            mobile: 'menu_button', // Вид меню для мобильных устройств
            format: '{N}&nbsp;&nbsp;&nbsp; {T} ({Q})', // Формат пункта меню
            // limit: 6, // Максимальное количество элементов в меню
            open: false, // Открывать меню по умолчанию
        },
        players: {
            alloha: {
                enable: true,
                position: 1
            },
            Cdnmovies: {
                enable: true,
                position: 2,
                domain: 'https://ugly-turkey.cdnmovies-stream.online'
            },
            Hdvb: {
                enable: true,
                position: 3
            },
            Ashdi: {
                enable: true,
                position: 4
            },
            params: {
                cdnmovies: { domain: 'kinogit.us' }
            },

            // Videocdn: {
            //     enable: true,
            //     position: 3
            // },
            // Kodik: {
            //     enable: true,
            //     position: 4
            // },
            // Collaps: {
            //     enable: true,
            //     position: 7
            // },
            // Voidboost: {
            //     enable: true,
            //     position: 8
            // },
        }
    });
}