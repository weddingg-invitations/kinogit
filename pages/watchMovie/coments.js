const input = document.getElementById('movie_comment_input')
const comment_box = document.getElementById('comment_box')
const add_comment_title = document.querySelector('.add_comment_title')

const lengthMin = 0
const lengthMax = 1000

let golbal_userName = ''
let golbal_user_id = 0

fetch('../../backend/profile.php', {
    method: 'get',
    headers: { 'Content-Type': 'application/json', },
})
    .then(r => r.json()).then(data => {
        golbal_userName = data.name
        golbal_user_id = data.user_id
        runAll()
    })
    .catch(err => {
        console.error(err)
    })

function runAll() {
    document.getElementById('add_comment_btn').addEventListener('click', () => {
        const inpLength = String(input.value).length

        if (inpLength > lengthMin && inpLength < lengthMax) {
            create_comment()
        }

        if (inpLength > lengthMax)
            alertText()
    })

    document.getElementById('movie_comment_input').addEventListener('keyup', (e) => {
        const inpLength = String(input.value).length

        if ((e.key == 'Enter') && (inpLength > lengthMin && inpLength < lengthMax)) {
            create_comment()
        }

        if (inpLength > lengthMax)
            alertText()
    })


    function create_comment() {
        let dataThime = getCurrentDateTime()

        fetch('../../backend/comments.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": golbal_userName,
                "user_id": golbal_user_id,
                "movie_id": get_move_dataa[0],
                "user_text": input.value,
                "timee": dataThime
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log('create comment', res);

                const div = document.createElement('div')
                div.className = 'user_coment_box'
                div.innerHTML = `
                    <div class="user_name">${golbal_userName} <span class="comment_dataThime">${dataThime}</span></div>
                    <div class="user_comment">${input.value}</div>
                    <div class="redact_delete_cont">
                        <div class="edit_comment" id="${res.id}"><img src='../../assets/svg/edit.png'></div>
                        <div class="delete_comment" id="${res.id}"><img src='../../assets/svg/trash.png'></div>
                    </div>
                    `
                comment_box.prepend(div)
                input.value = ''

                if (comment_box.querySelector('div')) {
                    add_comment_title.classList.add('anim_off')
                    add_comment_title.classList.remove('anim_on')
                } else {
                    add_comment_title.classList.add('anim_on')
                    add_comment_title.classList.remove('anim_off')
                }

                redact_coment()
                delete_comment()
            })
    }

    function alertText() {
        add_comment_title.textContent = 'текст комментария не должен превышать ' + lengthMax + ' символов'
        add_comment_title.classList.remove('anim_off')
        add_comment_title.classList.add('anim_on')

        setTimeout(() => {
            add_comment_title.classList.remove('anim_on')
            add_comment_title.classList.add('anim_off')
        }, 2000);
    }

    // redact comment
    function redact_coment() {
        let chackRedact = true

        document.querySelectorAll('.edit_comment').forEach((el, i) => {
            el.addEventListener('click', () => {
                const user_comment = document.querySelectorAll('.user_comment')[i]

                if (chackRedact) {
                    user_comment.setAttribute('contenteditable', chackRedact)
                    user_comment.classList.add('user_comment-active')
                    user_comment.focus()
                    chackRedact = false
                } else {
                    user_comment.setAttribute('contenteditable', chackRedact)
                    user_comment.classList.remove('user_comment-active')
                    chackRedact = true

                    fetch('../../backend/comments_edit.php', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "comment_id": el.id,
                            "input_value": user_comment.textContent
                        })
                    })
                        .then(response => response.json())
                        .then(res => {
                            console.log('comments edit', res);
                        })
                }
            });
        });
    }

    // delete
    function delete_comment() {
        let user_coment_box = document.querySelectorAll('.user_coment_box')

        document.querySelectorAll('.delete_comment').forEach((el, i) => {
            el.addEventListener('click', () => {
                fetch('../../backend/comments_delete.php', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "comment_id": el.id,
                    })
                })
                    .then(response => response.json())
                    .then(res => {
                        user_coment_box[i].remove()

                        if (comment_box.querySelector('div')) {
                            add_comment_title.classList.add('anim_off')
                            add_comment_title.classList.remove('anim_on')
                        } else {
                            add_comment_title.classList.add('anim_on')
                            add_comment_title.classList.remove('anim_off')
                        }
                        console.log('delete comment', res);
                    })
            })
        })
    }

    // get all coments and drow
    let movieUrll = decodeURI(window.location.search)
    let get_move_dataa = movieUrll.slice(1, movieUrll.length).split('/')

    fetch('../../backend/comments_get_all.php', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "movie_id": get_move_dataa[0],
        })
    })
        .then(response => response.json())
        .then(res => {

            res.forEach(el => {
                const user_id = el.user_id
                const comment_id = el.id
                const name = el.name
                const comment = el.comment
                const dataThime = el.time
                get_all_Comments(name, comment, dataThime, comment_id, user_id)
            });

            redact_coment()
            delete_comment()
        })

    function get_all_Comments(userName, inp_value, dataThime, comment_id, user_id) {
        if (Number(golbal_user_id) == Number(user_id)) {
            drow_personal_comments()
        } else {
            drow_other_comments()
        }

        function drow_personal_comments() {
            const div = document.createElement('div')
            div.className = 'user_coment_box'
            div.innerHTML = `
                <div class="user_name">${userName} <span class="comment_dataThime">${dataThime}</span></div>
                <div class="user_comment">${inp_value}</div>
                <div class="redact_delete_cont">
                    <div class="edit_comment" id="${comment_id}"><img src='../../assets/svg/edit.png'></div>
                    <div class="delete_comment" id="${comment_id}"><img src='../../assets/svg/trash.png'></div>
                </div>
                `
            comment_box.prepend(div)
        }
        function drow_other_comments() {
            const div = document.createElement('div')
            div.className = 'user_coment_box'
            div.innerHTML = `
                <div class="user_name">${userName} <span class="comment_dataThime">${dataThime}</span></div>
                <div class="user_comment">${inp_value}</div>
                <div class="redact_delete_cont">
                    <div class="edit_comment"  style="display: none;" id="${comment_id}"><img src='../../assets/svg/edit.png'></div>
                    <div class="delete_comment" style="display: none;"  id="${comment_id}"><img src='../../assets/svg/trash.png'></div>
                </div>
                `
            comment_box.prepend(div)
        }
        if (comment_box.querySelector('div')) {
            add_comment_title.classList.add('anim_off')
            add_comment_title.classList.remove('anim_on')
        } else {
            add_comment_title.classList.add('anim_on')
            add_comment_title.classList.remove('anim_off')
        }
    }

    function getCurrentDateTime() {
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;// Получаем месяц (нумерация начинается с 0)
        let day = currentDate.getDate();// Получаем число месяца
        let year = currentDate.getFullYear(); // Получаем год
        let hours = currentDate.getHours(); // Получаем часы
        let minutes = currentDate.getMinutes(); // Получаем минуты

        // Приводим числа к двузначному формату, если они состоят из одной цифры
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return month + '/' + day + '/' + year + ' - ' + hours + ':' + minutes;
    }

}