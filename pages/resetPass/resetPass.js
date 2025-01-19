function randomNum_fn() {
    let randomNum = Math.random() * 1000000
    randomNum = randomNum.toFixed(0)

    localStorage.setItem('key', randomNum)
    return randomNum
}

document.getElementById('send_mail_btn').addEventListener('click', () => {
    click_to_send()
})
document.getElementById('main_wrapper').addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        click_to_send()
    }
})

function click_to_send() {
    let mail = document.getElementById('mail').value
    const mail_check = document.querySelector('.mail_check')

    fetch('../../backend/get_all_users.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json())
        .then(data => {
            data.forEach(mails => {
                if (String(mails[3]).toLocaleLowerCase() == String(mail).toLocaleLowerCase() && String(mail).length > 5) {
                    next_levl(mail, randomNum_fn())
                    mail_check.innerHTML = '✔'
                    mail_check.style.color = 'rgb(89, 255, 0)'
                    return
                } else {
                    document.querySelector('.helper_text').innerHTML = 'эта почта не зарегистрирована'
                    mail_check.innerHTML = '✸'
                    mail_check.style.color = 'red'
                    return
                }
            })
        })
        .catch(r => console.log(r))

    function next_levl(mail, randomNum) {
        fetch('../../backend/mail.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ "randomNum": randomNum, "mail": mail })
        })
            .then(r => r.json())
            .then(data => {
                send_password(mail)
            })
            .catch(r => console.log(r))
    }
}

function send_password(mail) {
    let main_wrapper = document.getElementById('main_wrapper')
    // cahnge languige

    let text1_ru = 'придумайте новый пароль',
        text2_ru = 'код сброса',
        text3_ru = 'пароль',
        text4_ru = 'подтвердите пароль',
        text5_ru = 'Сброс пароля';


    let text1_en = 'think about a new password',
        text2_en = 'reset code',
        text3_en = 'password',
        text4_en = 'Confirm the password',
        text5_en = 'Password reset';

    let lang_storage = localStorage.getItem('language')
    if (lang_storage) {
        let get_lang = JSON.parse(lang_storage)
        lang_change(get_lang.lang)
    } else {
        lang_change('ru')
    }
    function lang_change(lang) {
        console.log(lang);
        main_wrapper.innerHTML = `
    <div class="reset_password_cont">
        <div class="helper_text">${lang == 'ru' ? text1_ru : text1_en}</div>
        <div class="input_box">
            <label class="labels" for="resetNumber">${lang == 'ru' ? text2_ru : text2_en}</label>
            <div class="input_box_items">
                <input class="inputs" id="resetNumber" type="text">
                <span class="check resetNumber_check"></span>
            </div>
        </div>
        <div class="input_box">
            <label class="labels" for="password">${lang == 'ru' ? text3_ru : text3_en}</label>
            <div class="input_box_items">
                <input class="inputs" id="password" type="password" required>
                <span class="check password_check"></span>
            </div>
        </div>
        <div class="input_box">
            <label class="labels" for="confirmPassword">${lang == 'ru' ? text4_ru : text4_en}</label>
            <div class="input_box_items">
                <input class="inputs" id="confirmPassword" type="password" required>
                <span class="check confirmPassword_check"></span>
            </div>
        </div>

        <button class="send_password_btn" id="send_password_btn">${lang == 'ru' ? text5_ru : text5_en}</button>
    </div>
    `
    }

    document.getElementById('send_password_btn').addEventListener('click', () => {
        if (checkAll()) {
            let password = document.getElementById('password').value

            fetch('../../backend/resetPass.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ "password": password, "mail": mail })
            })
                .then(r => r.json())
                .then(data => {
                    main_wrapper.innerHTML = 'OK'
                    main_wrapper.style.cssText = `
                    width: 100px; height: 100px;
                    min-width:100px;
                    color:#3ed60a; font-size: 20px;
                    display: flex; align-items: center; 
                    justify-content: center; border-radius: 100%;
                    `
                    setTimeout(() => {
                        window.location.href = '../../index.html'
                    }, 200);
                })
                .catch(r => console.log(r))
        }
    })

    main_wrapper.addEventListener('keyup', () => {
        checkAll()
    })
}

function checkAll() {
    let resetNumber = document.getElementById('resetNumber').value
    let save_number = localStorage.getItem('key')

    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirmPassword').value

    const resetNumber_check = document.querySelector('.resetNumber_check')
    const password_check = document.querySelector('.password_check')
    const confirmPassword_check = document.querySelector('.confirmPassword_check')

    if (resetNumber == save_number) {
        resetNumber_check.innerHTML = '✔'
        resetNumber_check.style.color = 'rgb(89, 255, 0)'
    } else {
        resetNumber_check.innerHTML = '✸'
        resetNumber_check.style.color = 'red'
        return false;
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        password_check.innerHTML = '✔'
        password_check.style.color = 'rgb(89, 255, 0)'
    } else {
        password_check.innerHTML = '✸'
        password_check.style.color = 'red'
        return false;
    }

    if (password == confirmPassword) {
        confirmPassword_check.innerHTML = '✔'
        confirmPassword_check.style.color = 'rgb(89, 255, 0)'
    } else {
        confirmPassword_check.innerHTML = '✸'
        confirmPassword_check.style.color = 'red'
        return false;
    }
    return true
}

// loader off
setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0'
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
    }, 600)
}, 1000)