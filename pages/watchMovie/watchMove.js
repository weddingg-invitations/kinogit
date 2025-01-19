// loader off
function loaderOFF() {
    document.querySelector('.loader').style.opacity = '0'
    document.getElementById('about_film').scrollIntoView()

    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
        // get_favorite()
    }, 700)
}

// --------------------------
let L_href = window.location.href
L_href = L_href.slice(L_href.indexOf('/pages'))

if (L_href == '/pages/watchMovie/watchMovie.html') {
    window.location.href = '../../index.html'
}

// --------------------------
const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

// meta attributes add
document.querySelectorAll('.FullYear').forEach(el => el.innerText = thisYear);

const search__films__cont = document.getElementById('search__films__cont');
const search_inp = document.getElementById('search_inp');
const search_btn = document.getElementById('search_btn');
const categories_cont = document.getElementById('categories');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

let currentPage = 1,
    nextPage = 2,
    prevPage = 3,
    lastUrl = '',
    totalPages = 100;

// TMDB themoviedb

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

let language = set_lang()[0],
    movie = 'movie'

if (decodeURI(window.location.href).match('tv'))
    movie = 'tv'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8',
    BASE_URL = 'https://api.themoviedb.org/3',
    API_URL = `${BASE_URL}/discover/multi?${language}?sort_by=popularity.desc&${API_KEY}`,
    IMG_URL = 'https://image.tmdb.org/t/p/w500',
    searchURL = `${BASE_URL}/search/${movie}?${API_KEY}`,
    options = { method: 'GET', headers: { accept: 'application/json' } };

genres = [
    {
        "id": 28,
        "name_en": "Action",
        "name_ru": "Боевик"
    },
    {
        "id": 10752,
        "name_en": "Military",
        "name_ru": "Военный"
    },
    {
        "id": 18,
        "name_en": "Drama",
        "name_ru": "Драма"
    },
    {
        "id": 99,
        "name_en": "Documentary",
        "name_ru": "Документальный"
    },
    {
        "id": 27,
        "name_en": "Horror",
        "name_ru": "Ужасы"
    },
    {
        "id": 10402,
        "name_en": "Music",
        "name_ru": "Музыка"
    },
    {
        "id": 35,
        "name_en": "Comedy",
        "name_ru": "Комедия"
    },
    {
        "id": 53,
        "name_en": "Thriller",
        "name_ru": "Триллер"
    },
    {
        "id": 14,
        "name_en": "Fantasy",
        "name_ru": "Фэнтези"
    },
    {
        "id": 9648,
        "name_en": "Mystic",
        "name_ru": "Мистика"
    },
    {
        "id": 37,
        "name_en": "Western",
        "name_ru": "Вестерн"
    },
    {
        "id": 10751,
        "name_en": "Family",
        "name_ru": "Семейный"
    },
    {
        "id": 16,
        "name_en": "Мультики",
        "name_ru": "Мультики"
    },
    {
        "id": 80,
        "name_en": "Cartoons",
        "name_ru": "Криминал"
    },
    {
        "id": 10749,
        "name_en": "Romance",
        "name_ru": "Романтика"
    },
    {
        "id": 12,
        "name_en": "Adventures",
        "name_ru": "Приключения"
    },
    {
        "id": 36,
        "name_en": "Historical",
        "name_ru": "Исторический"
    },
    {
        "id": 878,
        "name_en": "Science fiction",
        "name_ru": "Научная-фантастика"
    },
    {
        "id": 10770,
        "name_en": "TV-movie",
        "name_ru": "Телевизионный-фильм"
    },
    {
        "id": "индийские",
        "name_en": "Indian",
        "name_ru": "индийские"
    }
],
    // -----------------
    setTimeout(() => {
        get_top_movies()
    }, 2000);
function get_top_movies() {
    fetch(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&` + API_KEY)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')
            r.results.forEach(el => {
                let
                    title = el.title,
                    original_title = el.original_title,
                    release_date = el.release_date
                if (movie == 'tv') {
                    title = el.name
                    original_title = el.original_name
                    release_date = el.first_air_date
                }

                let AllData = String(el.id + '/' + title + '/' + original_title + '/' + release_date.split('-')[0]).replaceAll("'", '') + `/${movie}`

                const div = document.createElement('div')
                div.className = 'movie swiper-slide head-swiper-slide'
                div.setAttribute('aria-label', title + ',' + original_title)
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.innerHTML = `
                    <div class='movie_estimate top_movie_estimate'>
                        <img class='movie_favorite' src='../../assets/svg/favorite.svg'>
                    </div>
            
                    <a href="watchMovie.html?${AllData}" class="head-swiper-wrapper-play-img-cont allMovie" id="${el.id + '_' + movie}" move_data="${title} , ${original_title} , ${parseInt(release_date.split('-')[0])}">
						<img src="../../assets/svg/play-icon.svg" alt="play-button">
					</a>

					<div class="head_swiper_info" style="display:none">
                    <span class="head_swiper_info_imgSrc">${((window.innerWidth > 650) ? 'https://image.tmdb.org/t/p/original' : 'http://image.tmdb.org/t/p/w500')}${el.backdrop_path}</span>
                        <h2 class="head_swiper_info_original_title">${original_title}</h2>
						<h2 class="head_swiper_info_title">${title}</h2>
                        <span class="head_swiper_info_reyting">${String(el.vote_average).slice(0, 3)}</span>
                        <span class="head_swiper_info_data">${release_date}</span>
                        <span class="head_swiper_info_id">${el.id}</span>
					</div>`
                swiper_wrapper.appendChild(div)
            })

            showPoster_andData()
            headSwiper()
            getTop_move_andPlay()

            setTimeout(() => {
                // get_top_Bookmark_InServer()
                loaderOFF()
            }, 700);
        })
        .catch(err => console.error(err));
}

// serch logic
let serchLogic = () => {
    const filterText = ['sexs', 'porn', 'porno', 'порно', 'порн', 'секс'];

    for (const t of filterText) {
        if (t === search_inp.value) {
            alert('так нельзя!!');
            search_inp.value = ''
            search__films__cont.innerHTML = ''
            return; // Этот return прерывает выполнение кода после alert
        }
    }

    selectedGenre = [];
    getMovies(searchURL + '&query=' + search_inp.value + `&${language}`);
}

search_btn.addEventListener('click', () => {
    serchLogic()
})

search_inp.addEventListener('keyup', () => {
    serchLogic()
})

function getMovies(url) {
    lastUrl = url;

    fetch(url).then(res => res.json()).then(data => {
        if (data.results.length !== 0) {
            showMovies(data.results);
        } else {
            search__films__cont.innerHTML = `<h3 class="no-results">No Results</h3>`
        }
    })
}

function showMovies(data) {
    search__films__cont.innerHTML = '';

    data.forEach(el => {
        let
            title = el.title,
            original_title = el.original_title,
            release_date = el.release_date

        if (movie == 'tv') {
            title = el.name
            original_title = el.original_name
            release_date = el.first_air_date
        }
        let meta_description = document.getElementById('description')
        let descript = meta_description.getAttribute('description')
        meta_description.setAttribute('description', `${descript + ',' + title + ',' + original_title}`)

        let meta_keywords = document.getElementById('keywords')
        let keywords = meta_description.getAttribute('keywords')
        meta_keywords.setAttribute('description', `${keywords + ',' + title + ',' + original_title}`)

        let AllData = String(el.id + '/' + title + '/' + original_title + '/' + release_date.split('-')[0]).replaceAll("'", '') + `/${movie}`

        const a = document.createElement('a');
        a.href = `watchMovie.html?${AllData}`
        a.className = 'movie'
        a.id = el.id
        a.setAttribute('move_data', `${String(title + ' ' + original_title + ' ' + release_date.split('-')[0]).replaceAll("'", '')}`)
        // есле у фильма отсутствует название не показывать фильм ???

        if (Boolean(title) && el.poster_path) {
            a.innerHTML = `
            <div class="watch__now">
                <img src="${IMG_URL + el.poster_path}" alt="${title}">
            </div>

            <div class="movie-info">
                <h3 class="movie-info-title movie-title">${title}</h3>
                <p class="movie-info-paragraph">${parseInt(release_date.split('-')[0])}</p>
            </div>`
            search__films__cont.appendChild(a);
        }
    })
}

function showPoster_andData() {
    let movieUrl = decodeURI(window.location.search)
    let get_move_data = movieUrl.slice(1, movieUrl.length).split('/')
    let move_id = get_move_data[0]

    // let move_data = get_move_data[1].concat(' ,', get_move_data[2], ' ,', get_move_data[3])
    fetch(`${BASE_URL}/${movie}/${move_id}?${API_KEY}&${language}`)
        .then(response => response.json())
        .then(R => {
            if (R.status_message) {
                // document.querySelector('.showMassag').classList.add('showMassag-active')
                // document.querySelector('.showMassag_wrap').textContent = 'изевените за неудобство, мы работаем над этим попробуйте позже'
                console.log('status -> ', 'undefined movie');

                document.querySelector('.recomendet-films-cont').style.display = 'none'
            } else {
                console.log('status -> ', 'ok');
            }
            let
                title = '',
                original_title = '',
                release_date = '';

            if (movie == 'tv') {
                title = R.name
                original_title = R.original_name
                release_date = R.first_air_date
            } else {
                title = R.title
                original_title = R.original_title
                release_date = R.release_date
            }
            getActors(move_id)

            function reytingStars() {
                for (let i = 0; i < 10; i++) {
                    let span = document.createElement('span')
                    span.className = 'reyting_stars'
                    document.querySelector('.about_film_reyting_stars_cont').appendChild(span)

                    if (i <= Math.round(R.vote_average)) {
                        document.querySelectorAll('.reyting_stars')[i].style.cssText = 'background-color: yellow'
                    }
                }
            }

            document.getElementById('movie_comments').style.cssText = `background-image: url(${'https://image.tmdb.org/t/p/original/' + R.backdrop_path})`

            let about_film = document.getElementById('about_film')
            about_film.style.cssText = `background-image: url(${'https://image.tmdb.org/t/p/original/' + R.backdrop_path})`
            let about_film_info_title = document.querySelector('.about_film_info_title')
            about_film_info_title.innerHTML = title.replace(':', '<br>')
            about_film_info_title.setAttribute('title', title.replace(':', '<br>'))
            let about_film_poster_img = document.getElementById('about_film_poster_img')
            about_film_poster_img.setAttribute('alt', 'смотреть ' + title + ' ' + release_date.slice(0, 4))
            about_film_poster_img.setAttribute('title', 'смотреть ' + title + ' ' + release_date.slice(0, 4))
            about_film_poster_img.src = (IMG_URL + R.poster_path)
            document.querySelector('.allMovie_set_id').id = move_id + '_' + movie
            document.querySelector('.about_release_date').textContent = release_date.replace(/-/g, " / ")
            document.querySelector('.about_genre').textContent = R.genres.map(el => (' ' + el.name))
            document.querySelector('.about_film_duration').textContent = R.runtime
            document.querySelector('.about_film_info_overview').textContent = R.overview

            let movie_title_2_addjs = document.querySelector('#movie_title_2_addjs')
            movie_title_2_addjs.innerHTML = title.replace(':', '<br>')
            movie_title_2_addjs.setAttribute('title', title + ' без реклам')

            setTimeout(() => {
                if (!R.runtime) document.querySelector('.about_film_info_runtime').style.display = 'none'
            }, 0);

            reytingStars()
            show_recomendet_films(R)
            watch_thriller(move_id, R)
        })
        .catch(err => console.error(err));
}

// triller
function watch_thriller(id, R) {
    let arr = ['no resalt']

    fetch(`${BASE_URL}/${movie}/${id}/videos?${API_KEY}`)
        .then(res => res.json())
        .then(videoData => {
            const el = videoData.results

            for (let i = 0; i < el.length; i++) {
                arr.unshift(`<iframe allow="fullscreen;" src="https://www.youtube.com/embed/${el[i].key}?controls=1&autoplay='0'&loop='0'&playlist=${el[i].key}&showinfo='0'&mute='0'&frameborder='0'" title="${R.original_title}"></iframe>`)
                document.getElementById('triller').innerHTML = arr[0]
                if (R.original_title && (String(R.original_title).toLocaleLowerCase()).match('final trailer') || (String(R.original_title).toLocaleLowerCase()).match('official trailer'))
                    break
            }
        })
        .catch(e => console.log(e))
}

function getTop_move_andPlay() {
    document.querySelectorAll('.head-swiper-slide>.allMovie').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/historyWatch.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })
}

function getTMain_move_andPlay() {
    document.querySelectorAll('.recomendet-films-items>.allMovie').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/historyWatch.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })
}

function show_recomendet_films(R) {
    let selectedGenre = []
    genres.forEach(el => {
        R.genres.forEach(el2 => {
            if (el.name === el2.name)
                selectedGenre.push(el2.id)
        })
    })
    // selectedGenre
    recomendet_movies(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
}

function recomendet_movies(url) {
    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length != 0) {
            data.results.forEach(el => {

                let
                    title = el.title,
                    original_title = el.original_title,
                    release_date = el.release_date

                if (movie == 'tv') {
                    title = el.name
                    original_title = el.original_name
                    release_date = el.first_air_date
                }

                let AllData = String(el.id + '/' + title + '/' + original_title + '/' + release_date.split('-')[0]).replaceAll("'", '') + `/${movie}`

                let div = document.createElement('div');
                div.className = 'movie swiper-slide recomendet-films-items'
                // есле у фильма отсутствует название не показывать фильм ???
                if (Boolean(title) && el.poster_path) {
                    div.innerHTML = `
                        <div class='movie_estimate recomendet_films_movie_estimate'>
                            <img class='movie_favorite' src='../../assets/svg/favorite.svg'>
                        </div>

                        <a href="watchMovie.html?${AllData}" class="watch__now allMovie" id="${el.id + '_' + movie}" move_data="${String(title + ' ' + original_title + ' ' + release_date.split('-')[0]).replaceAll("'", '')}">
                            <img src="${IMG_URL + el.poster_path}" alt="${title}">
                        </a>

                        <div class="movie-info">
                            <h3 class="movie-info-title movie-title">${title.replace(':', '<br>')}</h3>
                            <p class="movie-info-paragraph">${parseInt(release_date.split('-')[0])}</p>
                        </div>`
                    document.getElementById('recomendet_films').appendChild(div);
                }

            })
        }

        setTimeout(() => {
            recomendet_films_Swiper()
        }, 1000);

        get_recomendet_films_Bookmark_InServer()
        getTMain_move_andPlay()
    })
}

window.addEventListener('scroll', () => {
    if (scrollY > 500) {
        document.getElementById('arrow_to_top').style.cssText = 'right:20px'
    } else {
        document.getElementById('arrow_to_top').style.cssText = 'right:-60px'
    }
})

document.getElementById('arrow_to_top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

// --------- send one id 015131 ------------
// function get_top_Bookmark_InServer() {
//     // ------------ get all favorite -----------
//     fetch('../../backend/get_bookmark.php', {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json', }
//     })
//         .then(r => r.json())
//         .then(res => {
//             if (res.registered) {
//                 res.forEach(el => {
//                     document.querySelectorAll('.allMovie').forEach(movID => {
//                         if (movID.id == el[1]) {
//                             movID.parentElement.querySelector('.movie_estimate').classList.add('movie_estimate--active')
//                         }
//                     });
//                 });
//             }
//         })
//         .catch(err => console.error('error -> ', err))
//     //     // -----------------------------------------

//     document.querySelectorAll('.top_movie_estimate').forEach(el => {
//         el.addEventListener('click', () => {
//             fetch('../../backend/bookmark.php', {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json', },
//                 body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
//             })
//                 .then(r => r.json())
//                 .then(res => {
//                     // console.log('ok -> ', res);
//                     if (res.registered) {
//                         el.classList.toggle('movie_estimate--active')

//                         document.querySelectorAll('.recomendet-films>.movie>.allMovie').forEach(el2 => {
//                             if (el2.id == el.parentElement.querySelector('.allMovie').id) {
//                                 el2.parentElement.querySelector('.movie_estimate').classList.toggle('movie_estimate--active')
//                             }
//                         })
//                     } else {
//                         document.querySelector('.reg_popup').style.display = 'flex'
//                     }
//                 })
//                 .catch(err => {
//                     console.error('error -> ', err);
//                 })
//         })
//     })
// }

function get_recomendet_films_Bookmark_InServer() {

    document.querySelectorAll('.recomendet_films_movie_estimate').forEach(el => {
        el.addEventListener('click', () => {
            let movieUrl = decodeURI(window.location.search.split('/')[4])

            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
            })
                .then(r => r.json())
                .then(res => {
                    // console.log('ok -> ', res);
                    if (res.registered) {
                        el.classList.toggle('movie_estimate--active')

                        document.querySelectorAll('.head-swiper-wrapper>.movie>.allMovie').forEach(el2 => {
                            if (el2.id == el.parentElement.querySelector('.allMovie').id) {
                                el2.parentElement.querySelector('.movie_estimate').classList.toggle('movie_estimate--active')
                            }
                        })
                    } else {
                        document.querySelector('.reg_popup').style.display = 'flex'
                    }
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    });
}

// const get_favorite = () => {
//     fetch('../../backend/get_bookmark.php', {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json', }
//     })
//         .then(r => r.json())
//         .then(res => {
//             if (res.length) {
//                 res.forEach(el => {
//                     document.querySelectorAll('.allMovie').forEach(movID => {
//                         if (movID.id == el[1]) {
//                             movID.parentElement.querySelector('.movie_estimate').classList.add('movie_estimate--active')
//                         }
//                     });
//                 });
//             }
//         })
//         .catch(err => console.error('error -> ', err))
// }

// reg_popup_account


document.getElementById('reg_popup_account_close').addEventListener('click', () => {
    document.getElementById('reg_popup_account').style.cssText = 'display:none'
})

document.getElementById('reg_popup_account_registration').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.cssText = 'display:flex'
})

function getActors(id) {
    fetch(`https://api.themoviedb.org/3/${movie}/${id}/credits?${API_KEY}&${language}`)
        .then(r => r.json())
        .then(data => {
            let all = data
            // let crew = all.crew
            // console.log(crew);

            let cast = all.cast

            cast.forEach(el => {
                if (el.profile_path) {
                    document.getElementById('actors_slider').innerHTML += `
                    <div class='swiper-slide actors' id='${el.id}'>
                        <img src="https://image.tmdb.org/t/p/w500/${el.profile_path}" alt="${el.name}">
                        <h2 class='actor_name'>${el.name}</h2>  
                    </div>`
                }
            })
            get_movies_actor_id()
        })
        .catch(error => console.error('Fetch operation failed:', error));
}

function get_movies_actor_id() {
    document.querySelectorAll('.actors').forEach(el => {
        el.addEventListener('click', () => {
            document.querySelector('#actors_popup_actorname').innerText = ` << ${el.querySelector('.actor_name').textContent} >>`
            document.getElementById('actors_popup').style.cssText = 'display: flex;'
            document.body.style.cssText = 'overflow: hidden;'
            document.getElementById('actors_popup_movies').innerHTML = ''
            getMoviesByActorID(el.id)
        })
    })

    function getMoviesByActorID(actorID) {
        fetch(`https://api.themoviedb.org/3/person/${actorID}/movie_credits?${API_KEY}&${language}`,)
            .then(r => r.json())
            .then(r => {
                // vse filmi gde snimalsya etot aktyor
                r.cast.forEach(el => {
                    let ganress = []
                    genres.forEach(g1 => {
                        el.genre_ids.forEach(g2 => {
                            if (g1.id == g2)
                                if (language == 'language=en-EN') {
                                    ganress.push(g1.name_en)
                                    lang_change('en')
                                } else if (language == 'language=ru-RU') {
                                    ganress.push(g1.name_ru)
                                    lang_change('ru')
                                }
                        })
                    })

                    if (el.poster_path && el.title) {
                        document.getElementById('actors_popup_movies').innerHTML += `
                            <div class="all_actors_movie">
                                <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}">
                                <div class="all_actors_movie__innerCont">
                                    <h2 class="all_actors_movie_title">${el.title}</h2>
                                    <p style="${el.vote_average ? "" : 'display: none'}">
                                        <span class="all_actors_movie_text1">Жанры - </span>
                                        ${ganress.map(g => ' ' + g)}
                                    </p>
                                    <p style="${el.character ? "" : 'display: none'}">
                                        <span class="character_text">персонаж - </span>
                                        ${el.character}
                                    </p>
                                    <p style="${el.popularity ? "" : 'display: none'}">
                                        <span class="popularity_text">популярность - </span>
                                        ${el.popularity}
                                    </p>
                                    <p style="${el.release_date ? "" : 'display: none'}">
                                        <span class="release_date_text">Дата выхода - </span>
                                        ${el.release_date}
                                    </p>
                                    <p style="${el.vote_average ? "" : 'display: none'}">
                                        <span class="vote_average_text">голосовали - </span>
                                        ${el.vote_average}
                                    </p>
                                </div>
                                <p class="all_actors_movie__overview" style="${el.overview ? "" : 'display: none'}">${el.overview}</p>
                            </div>`
                        if (document.querySelectorAll('.all_actors_movie').length <= 0) {

                        }
                        console.log(document.querySelectorAll('.all_actors_movie').length);
                    }
                })
                // document.getElementById('xLoader').classList.add('xLoader__off')
            })
    }

    document.getElementById('actors_popup_close').addEventListener('click', () => {
        document.getElementById('actors_popup').style.cssText = 'display: none;'
        document.body.style.cssText = 'overflow: auto;'
    })
}