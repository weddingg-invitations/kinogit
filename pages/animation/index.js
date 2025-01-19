// loader off
function loaderOFF() {
    document.querySelector('.loader').style.opacity = '0'
    window.scrollTo(0, 0)
    get_favorite()

    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
    }, 700)
}

const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

let todayDate = new Date();
todayDate.setDate(todayDate.getDate() - 40);
let formattedDate = todayDate.toISOString().slice(0, 10);

// SEO meta attributes add
document.getElementById('meta_keywords').setAttribute('content', 'смотреть фильмы, фильмы онлайн, смотреть ТВ, ТВ онлайн, сериалы онлайн, смотреть сериалы, транслировать фильмы, транслировать сериалы, стриминг онлайн, смотреть онлайн, фильмы, смотреть фильмы Армения, смотреть ТВ онлайн, без загрузки, полнометражные фильмы,' + thisYear)
document.querySelectorAll('.FullYear').forEach(el => el.innerText = thisYear);

const
    main__section__films = document.getElementById('main__section__films'),
    search_inp = document.getElementById('search_inp'),
    search_btn = document.getElementById('search_btn'),
    categories_cont = document.getElementById('genres__text'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    current = document.getElementById('current'),
    // ----------------------- select genre btn -----------------------
    select = document.querySelectorAll('.select'),
    all__select__arrow = document.querySelectorAll('.select__arrow'),
    genres__popup = document.querySelectorAll('.genres__popup');

//TMDB themoviedb
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjQwYjY2MjVhZWEwNDcyZTU4ZGE2ZDdkZGMxMmZhZCIsInN1YiI6IjY0N2RlZWFjOTM4MjhlMDBhNzY1OGUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MBEPwwpXitFgjAFw1v_yLu3YhmG39HgHebNjYk1xVb4'
    }
}

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
    } else
        return ['language=ru-RU', 'name_' + lang]
}

let language = set_lang()[0],
    selectedGenre = [];

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8',
    BASE_URL = 'https://api.themoviedb.org/3',
    IMG_URL = 'https://image.tmdb.org/t/p/w500',
    searchURL = `${BASE_URL}/search/movie?page=1?${API_KEY}`;

let currentPage = 1,
    nextPage = 2,
    prevPage = 3,
    firstUrl = `${BASE_URL}/discover/movie?page=1&${language}?sort_by=popularity.desc&${API_KEY}`,
    lastUrl = `${BASE_URL}/discover/movie?page=1&${language}?sort_by=popularity.desc&${API_KEY}`,
    totalPages = 100,
    movie_tv = 'movie';

const
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
    countries_en = [
        {
            'usa': 'en'
        },
        {
            'argentina': 'ar'
        },
        {
            'belgium': 'be'
        },
        {
            'hungary': 'hu'
        },
        {
            'germany': 'de'
        },
        {
            'spain': 'es'
        },
        {
            'italy': 'it'
        },
        {
            'canada': 'ca'
        },
        {
            'china': 'cn'
        },
        {
            'netherlands': 'nl'
        },
        {
            'norway': 'no'
        },
        {
            'poland': 'pl'
        },
        {
            'russia': 'ru'
        },
        {
            'thailand': 'th'
        },
        {
            'turkey': 'tr'
        },
        {
            'finland': 'fi'
        },
        {
            'france': 'fr'
        },
        {
            'sweden': 'se'
        },
        // {
        //     'australia': 'au'
        // },
        // {
        //     'armenia': 'am'
        // },
        // {
        //     'belarus': 'by'
        // },
        // {
        //     'brazil': 'br'
        // },
        // {
        //     'uk': 'gb'
        // },
        // {
        //     'hong kong': 'hk'
        // },
        // {
        //     'denmark': 'dk'
        // },
        // {
        //     'india': 'in'
        // },
        // {
        //     'ireland': 'ie'
        // },
        // {
        //     'kazakhstan': 'kz'
        // },
        // {
        //     'colombia': 'co'
        // },
        // {
        //     'mexico': 'mx'
        // },
        // {
        //     'new zealand': 'nz'
        // },
        // {
        //     'switzerland': 'ch'
        // },
        // {
        //     'south africa': 'za'
        // },
        // {
        //     'south korea': 'kr'
        // },
        // {
        //     'japan': 'jp'
        // }
    ],
    countries_ru = [
        {
            'сша': 'en'
        },
        {
            'аргентина': 'ar'
        },
        {
            'бельгия': 'be'
        },
        {
            'венгрия': 'hu'
        },
        {
            'германия': 'de'
        },
        {
            'испания': 'es'
        },
        {
            'италия': 'it'
        },
        {
            'канада': 'ca'
        },
        {
            'китай': 'cn'
        },
        {
            'нидерланды': 'nl'
        },
        {
            'норвегия': 'no'
        },
        {
            'польша': 'pl'
        },
        {
            'россия': 'ru'
        },
        {
            'таиланд': 'th'
        },
        {
            'турция': 'tr'
        },
        {
            'финляндия': 'fi'
        },
        {
            'франция': 'fr'
        },
        {
            'швеция': 'se'
        },
        // {
        //     'австралия': 'au'
        // },
        // {
        //     'армения': 'am'
        // },
        // {
        //     'беларусь': 'by'
        // },
        // {
        //     'бразилия': 'br'
        // },
        // {
        //     'великобритания': 'gb'
        // },
        // {
        //     'гонконг': 'hk'
        // },
        // {
        //     'дания': 'dk'
        // },
        // {
        //     'индия': 'in'
        // },
        // {
        //     'ирландия': 'ie'
        // },
        // {
        //     'казахстан': 'kz'
        // },
        // {
        //     'колумбия': 'co'
        // },
        // {
        //     'мексика': 'mx'
        // },
        // {
        //     'новая зеландия': 'nz'
        // },
        // {
        //     'швейцария': 'ch'
        // },
        // {
        //     'юар': 'za'
        // },
        // {
        //     'южная корея': 'kr'
        // },
        // {
        //     'япония': 'jp'
        // }
    ],
    rating_ru = [
        {
            'Больше 9': 9
        },
        {
            'Больше 8': 8
        },
        {
            'Больше 7': 7
        },
        {
            'Больше 6': 6
        },
        {
            'Больше 5': 5
        },
        {
            'Больше 4': 4
        },
        {
            'Больше 3': 3
        },
        {
            'Больше 2': 2
        },
        {
            'Больше 1': 1
        },
    ],
    rating_en = [
        {
            'More 9': 9
        },
        {
            'More 8': 8
        },
        {
            'More 7': 7
        },
        {
            'More 6': 6
        },
        {
            'More 5': 5
        },
        {
            'More 4': 4
        },
        {
            'More 3': 3
        },
        {
            'More 2': 2
        },
        {
            'More 1': 1
        },
    ];

// top slider movies
let get_top_movies = () => {
    fetch(`${BASE_URL}/discover/movie?page=1&${language}&primary_release_year=${thisYear}&year=${thisYear}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre) + '&without_genres=16', options)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')
            r.results.forEach(el => {
                let AllData = String(el.id + '/' + el.title + '/' + el.original_title + '/' + el.release_date.split('-')[0]).replaceAll("'", '') + '/movie'

                const div = document.createElement('div')
                div.className = 'swiper-slide head-swiper-slide'
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.innerHTML = `
                    <div class='movie_estimate top_movie_estimate'>
                        <img class='movie_favorite' src="../../assets/svg/favorite.svg">
                    </div>

					<a href="../watchMovie/watchMovie.html?${AllData}" class="allMovie movie head-swiper-wrapper-play-img-cont" id="${el.id}_movie" move_data="${String(el.title + ' ' + el.original_title + ' ' + el.release_date.split('-')[0]).replaceAll("'", '')}"}>
						<img src="../../assets/svg/play-icon.svg" alt="play-button">
					</a>

					<div class="head_swiper_info" style="display:none">
                        <span class="head_swiper_info_imgSrc">${((window.innerWidth > 650) ? 'https://image.tmdb.org/t/p/original' : 'http://image.tmdb.org/t/p/w500')}${el.backdrop_path}</span>
                        <h2 class="head_swiper_info_original_title">${el.original_title}</h2>
						<h2 class="head_swiper_info_title">${el.title}</h2>
                        <span class="head_swiper_info_reyting">${String(el.vote_average).slice(0, 3)}</span>
                        <span class="head_swiper_info_data">${el.release_date}</span>
                        <span class="head_swiper_info_id">${el.id}</span>
					</div>`
                swiper_wrapper.appendChild(div)
            })
            setTimeout(() => {
                headSwiper()
                loaderOFF()
            }, 300);
            getTop_move_andPlay()
            get_top_Bookmark_InServer()
        })
}
get_top_movies()

// установить Жанр
function setGenre() {
    categories_cont.innerHTML = '';
    let year = 0
    let getcountries = []

    genres.forEach(genre => {
        const t = document.createElement('div');
        t.className = 'genres__text__items';
        t.id = genre.id;
        t.innerText = genre[set_lang()[1]];
        t.addEventListener('click', () => {
            selectedGenre = []
            selectedGenre = genre.id

            if (selectedGenre !== 16) {
                lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_year=${year ? year : thisYear}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre) + '&without_genres=16'
                getMovies(lastUrl)
            } else {
                lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_year=${year ? year : thisYear}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre)
                getMovies(lastUrl)
            }
        })
        categories_cont.append(t);
    })

    const select_year = () => {
        let years = []
        for (let i = 0; i <= 10; i++) {
            years.push(`${thisYear - i - 1} - ${thisYear - i}`)
        }
        // set lang
        years.push('2000 - 2010', '1990 - 2000', '1980 - 1990', (set_lang()[1] == 'name_en' ? 'before' : 'до') + ' - 1980')
        let select__years__popup = document.querySelector('.select__years__popup')
        select__years__popup.innerHTML = ''

        years.forEach((y, index) => {
            let div = document.createElement('div')
            div.className = 'select__years__items'
            div.id = y
            div.textContent = y
            select__years__popup.appendChild(div)

            let select__years__items = document.querySelectorAll(".select__years__items")
            select__years__items[index].addEventListener('click', () => {
                year = 0

                // get id 
                let getYears = select__years__items[index].id.replaceAll(' ', '').split('-')
                year = (String(getYears) !== 'до,1980') ? getYears : getYears[1]

                if (selectedGenre !== 16) {
                    lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_date.gte=${year ? year[0] + '-01-01' : thisYear}&primary_release_date.lte=${year ? year[1] + '-12-31' : thisYear}&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre) + '&without_genres=16'
                    getMovies(lastUrl)
                } else {
                    lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_date.gte=${year ? year[0] + '-01-01' : thisYear}&primary_release_date.lte=${year ? year[1] + '-12-31' : thisYear}&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre)
                    getMovies(lastUrl)
                }
            })
        })
    }
    select_year()

    const select_countries = () => {
        let select__countries__popup = document.querySelector('.select__countries__popup')
        select__countries__popup.innerHTML = ''
        // countries_en
        let lang = 'ru'
        if (set_lang()[1] == 'name_en')
            lang = countries_en
        else lang = countries_ru

        lang.forEach((y, index) => {
            let div = document.createElement('div')
            div.className = 'select__countries__items'
            div.id = Object.values(y)
            div.textContent = Object.keys(y)
            select__countries__popup.appendChild(div)

            let select__countries__items = document.querySelectorAll(".select__countries__items")
            select__countries__items[index].addEventListener('click', () => {
                year = 0

                // get id 
                let setCountries = select__countries__items[index].id


                if (selectedGenre !== 16) {
                    lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_year=${year ? year[0] : thisYear}&year=${year ? year : thisYear}&with_original_language=${setCountries}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre) + '&without_genres=16'
                    getMovies(lastUrl)
                } else {
                    lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_year=${year ? year[0] : thisYear}&year=${year ? year : thisYear}&with_original_language=${setCountries}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre)
                    getMovies(lastUrl)
                }

                getcountries.push(setCountries)
            })
        })
    }
    select_countries()

    const select_rating = () => {
        let select__rating__popup = document.querySelector('.select__rating__popup')
        select__rating__popup.innerHTML = ''

        let lang = 'ru'
        if (set_lang()[1] == 'name_en')
            lang = rating_en
        else lang = rating_ru

        lang.forEach((y, index) => {
            let div = document.createElement('div')
            div.className = 'select__rating__items'
            div.id = Object.values(y)
            div.textContent = Object.keys(y)
            select__rating__popup.appendChild(div)

            let select__rating__items = document.querySelectorAll(".select__rating__items")
            select__rating__items[index].addEventListener('click', () => {

                // get id
                let getrating = select__rating__items[index].id

                if (selectedGenre !== 16) {
                    lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_year=${year ? year[0] : thisYear}&year=${year ? year : thisYear}&with_original_language=${getcountries}&vote_average.gte=${getrating}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre) + '&without_genres=16'
                    getMovies(lastUrl)
                } else {
                    lastUrl = BASE_URL + `/discover/movie?page=1&${language}&primary_release_year=${year ? year[0] : thisYear}&year=${year ? year : thisYear}&with_original_language=${getcountries}&vote_average.gte=${getrating}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre)
                    getMovies(lastUrl)
                }
            })
        })

    }

    select_rating()
}

select.forEach((el, i) => {
    el.addEventListener('click', () => {
        if (el.classList[2]) {
            document.querySelectorAll('.select')[i].classList.remove('select--active')
            document.querySelectorAll('.select__arrow')[i].classList.remove('select__arrow--active')
            document.querySelectorAll('.genres__popup')[i].classList.remove('genres__popup--active')
        } else {
            select.forEach((e, ind) => {
                document.querySelectorAll('.select')[ind].classList.remove('select--active')
                document.querySelectorAll('.select__arrow')[ind].classList.remove('select__arrow--active')
                document.querySelectorAll('.genres__popup')[ind].classList.remove('genres__popup--active')
            })
            document.querySelectorAll('.select')[i].classList.add('select--active')
            document.querySelectorAll('.select__arrow')[i].classList.add('select__arrow--active')
            document.querySelectorAll('.genres__popup')[i].classList.add('genres__popup--active')
        }
    })
})

window.addEventListener('scroll', () => {
    select.forEach((el, i) => {
        document.querySelectorAll('.select')[i].classList.remove('select--active')
        document.querySelectorAll('.select__arrow')[i].classList.remove('select__arrow--active')
        document.querySelectorAll('.genres__popup')[i].classList.remove('genres__popup--active')
    })
})

// множественный выбор жанор
const highlightSelection = () => {
    const clear = document.querySelector('.reset__default')
    // очистить кнопкой
    clear.classList.add('reset__default--active');

    clear.addEventListener('click', () => {
        selectedGenre = [];
        getMovies(firstUrl);
        // delete active
    })
}
highlightSelection()

// получить фильмы
getMovies(lastUrl)
function getMovies(url) {
    return new Promise(resolve => {
        fetch(url, options).then(res => res.json())
            .then(data => {
                if (data.results.length !== 0) {
                    showMovies(data.results, movie_tv);

                    get_main_Bookmark_InServer()
                    currentPage = data.page;
                    nextPage = currentPage + 1;
                    prevPage = currentPage - 1;
                    totalPages = data.total_pages;

                    pagination(currentPage, totalPages)

                    if (currentPage <= 1) {
                        prev.classList.add('disabled');
                        next.classList.remove('disabled')
                    }
                    else if (currentPage >= totalPages) {
                        prev.classList.remove('disabled');
                        next.classList.add('disabled')
                    }
                    else {
                        prev.classList.remove('disabled');
                        next.classList.remove('disabled')
                    }
                    currentPage = currentPage
                } else {
                    main__section__films.innerHTML = `<h3 class="no-results">No Results</h3>`
                }
            })
    })
}

// нумерация страниц
function pagination(currentPage, totalPages) {
    current.innerHTML = `
    <a class="pages" id="pages">${currentPage - 4}
    <a class="pages" id="pages">${currentPage - 3}
    <a class="pages" id="pages">${currentPage - 2}
    <a class="pages" id="pages">${currentPage - 1}
    <a class="pages pages-active" id="pages">${currentPage}
    <a class="pages" id="pages">${currentPage + 1}
    <a class="pages" id="pages">${currentPage + 2}
    <a class="pages" id="pages">${currentPage + 3}
    <a class="pages" id="pages">${currentPage + 4}
    `
    document.querySelectorAll('.pages').forEach(el => {
        if (el.innerText < 1) {
            el.style.display = 'none'
        }
        if (el.innerText > totalPages) {
            el.style.display = 'none'
        }
    })
    currentPage = currentPage

    pagination_click()
}
// показать фильмы
function showMovies(data) {
    main__section__films.innerHTML = '';

    data.forEach(el => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie'
        // есле у фильма отсутствует название не показывать фильм
        let AllData = String(el.id + '/' + el.title + '/' + el.original_title + '/' + el.release_date.split('-')[0]).replaceAll("'", '') + '/movie'
        if (Boolean(el.title) && el.poster_path) {
            movieEl.innerHTML = `
                <div class='movie_estimate main_movie_estimate'>
                    <img class='movie_favorite' src="../../assets/svg/favorite.svg">
                </div>
    
                <img class='poster-img' src="${IMG_URL + el.poster_path}" alt="${el.title}">
                <a href="../watchMovie/watchMovie.html?${AllData}" class="watch__now allMovie" id="${el.id}_movie" move_data="${String(el.title + ' ' + el.original_title + ' ' + el.release_date.split('-')[0]).replaceAll("'", '')}">
                    <img src="../../assets/svg/play-icon.svg" alt="play-button">
                </a>
                <div class="movie-info">
                    <h3 class="movie-info-title movie-title">${el.title}</h3>
                    <div class='movie-info-subtitle-cont'>
                        <p class="movie-info-paragraph">${parseInt(el.release_date.split('-')[0])}</p>
                        <span>${(el.adult == true) ? "Для взрослых 18+" : ""}</span>
                        <span class="movie-info-reyting ${getColor(el.vote_average)}">${String(el.vote_average).slice(0, 3)}</span>
                    </div>
                </div>`
            main__section__films.appendChild(movieEl)
        }
    })

    setGenre();
    getTMain_move_andPlay()
}

// получить цвет
function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}

// serch logic
let serchLogic = () => {
    const filterText = ['sexs', 'porn', 'porno', 'порно', 'порн', 'секс'];

    for (const t of filterText) {
        if (t === search_inp.value) {
            alert('так нельзя!!');
            search_inp.value = ''
            return; // Этот return прерывает выполнение кода после alert
        }
    }

    selectedGenre = [];
    lastUrl = searchURL + '&query=' + search_inp.value + `&${language}`
    getMovies(lastUrl);
}

// search_inp (key)
search_inp.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && search_inp.value)
        serchLogic()
})

search_btn.addEventListener('click', () => {
    if (search_inp.value) {
        serchLogic()
    }
})

// нумерация страниц назад 
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})

// нумерация страниц вперед 
next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

// нумерация страниц
function pagination_click() {
    document.querySelectorAll('#pages').forEach(p => {
        p.addEventListener('click', () => {
            pageCall(p.innerText)
        })
    })
}

// страница созвать
function pageCall(page) {
    newUrl = lastUrl.replace(/page=\d+/, 'page=' + page);
    lastUrl = newUrl

    getMovies(lastUrl);
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
}

// get movie and play 
function getTop_move_andPlay() {
    document.querySelectorAll('.head-swiper-wrapper>.swiper-slide>.allMovie').forEach(el => {
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
    document.querySelectorAll('.main__section__films>.movie>.allMovie').forEach(el => {
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

// animation 
lastUrl = BASE_URL + `/discover/movie?page=1&${language}?sort_by=popularity.desc&${API_KEY}&with_genres=16`
getMovies(lastUrl)
document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
// ---------

// --------- send one id 015131 ------------
function get_top_Bookmark_InServer() {
    document.querySelectorAll('.top_movie_estimate').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                    if (arr.registered) {
                        el.classList.toggle('movie_estimate--active')

                        document.querySelectorAll('.main__section__films>.movie>.allMovie').forEach(el2 => {
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

function get_main_Bookmark_InServer() {
    document.querySelectorAll('.main_movie_estimate').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                    if (arr.registered) {
                        el.classList.toggle('movie_estimate--active')

                        document.querySelectorAll('.head-swiper-slide>.allMovie').forEach(el2 => {
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
    get_favorite()
}

function get_favorite() {
    fetch('../../backend/get_bookmark.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', }
    })
        .then(r => r.json())
        .then(res => {
            if (res.length) {
                res.forEach(el => {
                    document.querySelectorAll('.allMovie').forEach(movID => {
                        if (movID.id == el[1]) {
                            movID.parentElement.querySelector('.movie_estimate').classList.add('movie_estimate--active')
                        }
                    });
                });
            }
        })
        .catch(err => console.error('error -> ', err))
}

// reg_popup_account
document.getElementById('reg_popup_account_close').addEventListener('click', () => {
    document.getElementById('reg_popup_account').style.cssText = 'display:none'
})

document.getElementById('reg_popup_account_registration').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.cssText = 'display:flex'
})