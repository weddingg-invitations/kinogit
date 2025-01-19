document.querySelector('.login__openPopup').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.display = 'flex'
})

document.getElementById('sign_up_btn').addEventListener('click', () => {
    document.getElementById('sign_up_btn').classList.add('reg_popup_wrap_menu-active');
    document.getElementById('registration_btn').classList.remove('reg_popup_wrap_menu-active');

    document.getElementById('login__').classList.add('active-block');
    document.getElementById('registr__').classList.remove('active-block');
});

document.getElementById('registration_btn').addEventListener('click', () => {
    document.getElementById('sign_up_btn').classList.remove('reg_popup_wrap_menu-active');
    document.getElementById('registration_btn').classList.add('reg_popup_wrap_menu-active');

    document.getElementById('registr__').classList.add('active-block');
    document.getElementById('login__').classList.remove('active-block');
});

document.querySelector('.reg_popup_close').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.display = 'none';
})
// -----------------------------------------------------------------------------------
let domain = (new URL(window.location.href)).hostname;
let http_or_https = 'http://'

if (domain.indexOf('.') > 0)
    http_or_https = 'https://'


function register() {

    let gender = ''

    // Добавляем слушатель события отправки формы
    document.getElementById("reg_form_btn").addEventListener("click", function () {
        start_registration()
    });

    document.querySelector('#registr__').addEventListener('keyup', (e) => {
        validateForm()
        validateDateOfBirth()
        if (validateForm() && validateDateOfBirth() && e.key == 'Enter') {
            console.log(validateForm(), validateDateOfBirth(), e.key == 'Enter');
            start_registration()
        }
    })

    function start_registration() {
        if (validateForm() && validateDateOfBirth() && gender) {
            // Если форма валидна, отправляем её
            const regName = document.querySelector('#regName').value
            const regLname = document.querySelector('#regLname').value
            const regAge = document.querySelector('#regAge').value
            const regEmail = document.querySelector('#regEmail').value
            const regPassword = document.querySelector('#regPassword').value

            // console.log('>> ok', regName, regLname, regAge, regEmail, regPassword, gender);

            fetch(`${http_or_https + domain}/backend/register.php`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ regName, regLname, regAge, regEmail, regPassword, gender })
            })
                .then(r => r.json())
                .then(res => {
                    console.log('register backend >> ', res)
                    if (res == 'register_ok') {
                        window.location.href = `${http_or_https + domain}/pages/profile/profile.html`
                    }
                    else if (res == 'email_match') {
                        showMassages('этот емейл уже зарегистрирован')
                    }
                })
                .catch(err => console.error('register backend >>> ', err))
        }
    }

    document.querySelector('.reg_popup').addEventListener('keydown', () => {
        formatInputDate(document.getElementById('regAge'))
    })
    // Функция для валидации формы
    function validateForm() {
        // Получаем значения полей формы
        let regName = document.getElementById("regName").value.trim(),
            regLname = document.getElementById("regLname").value.trim(),
            regEmail = document.getElementById("regEmail").value.trim(),
            gender = document.querySelector('input[name="gender"]:checked'),
            regPassword = document.getElementById("regPassword").value,
            regConfirm = document.getElementById("regConfirm").value,
            regAge = document.getElementById('regAge');

        let regName_chack = document.getElementById("regName_chack"),
            regLname_chack = document.getElementById("regLname_chack"),
            regEmail_chack = document.getElementById("regEmail_chack"),
            regAge_chack = document.getElementById("date_chack"),
            gender_chack = document.getElementById("gender_chack"),
            regPassword_chack = document.getElementById("regPassword_chack"),
            regConfirm_chack = document.getElementById("regConfirm_chack");

        // Простой пример валидации (можете настроить под свои требования)

        // ----------------------------------------------
        if (String(regName).length < 2) {
            regName_chack.style.cssText = 'color:red'
            regName_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'напишите ваше имя'
            return false;
        } else {
            regName_chack.style.cssText = 'color:#59ff00'
            regName_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (String(regLname).length < 2) {
            regLname_chack.style.cssText = 'color:red'
            regLname_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'напишите вашу фамилию'
            return false;
        } else {
            regLname_chack.style.cssText = 'color:#59ff00'
            regLname_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (String(regAge.value).length < 10) {
            regAge_chack.style.cssText = 'color:red'
            regAge_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'когда вы родились ?'
            return false;
        }
        else {
            regAge_chack.style.cssText = 'color:#59ff00'
            regAge_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (String(regEmail).length < 5) {
            regEmail_chack.style.cssText = 'color:red'
            regEmail_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'напишите вашу электронную почту'
            return false;
        } else {
            regEmail_chack.style.cssText = 'color:#59ff00'
            regEmail_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(regPassword)) {
            regPassword_chack.style.cssText = 'color:red'
            regPassword_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'Пароль должен содержать хотя бы одну <br> (маленькую букву) - (большую букву) - (одну цифру)'
            return false;
        } else {
            regPassword_chack.style.cssText = 'color:#59ff00'
            regPassword_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (regPassword !== regConfirm) {
            regConfirm_chack.style.cssText = 'color:red'
            regConfirm_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'подтвердите порол'
            return false;
        } else {
            regConfirm_chack.style.cssText = 'color:#59ff00'
            regConfirm_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (!gender) {
            gender_chack.style.cssText = 'color:red'
            gender_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'ваш пол'
            return false;
        }
        // ----------------------------------------------
        // Если все проверки пройдены, возвращаем true
        return true;
    }

    function formatInputDate(input) {
        // Очищаем от любых символов, кроме цифр
        var cleanedValue = input.value.replace(/[^\d]/g, '');

        // Добавляем символ / после первых двух символов и после следующих двух символов
        if (cleanedValue.length > 2) {
            cleanedValue = cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
        }
        if (cleanedValue.length > 5) {
            cleanedValue = cleanedValue.slice(0, 5) + '/' + cleanedValue.slice(5);
        }
        input.value = cleanedValue;
    }

    function validateDateOfBirth() {
        let regAge_chack = document.getElementById("date_chack")

        var userInput = regAge.value;
        var dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!dateRegex.test(userInput)) {
            return false;
        }
        var matches = userInput.match(dateRegex);
        var day = parseInt(matches[1], 10);
        var month = parseInt(matches[2], 10) - 1;
        var year = parseInt(matches[3], 10);
        var userDate = new Date(year, month, day);

        if (isNaN(userDate.getTime())) {
            document.querySelector('.helper_text').innerHTML = 'введите корректную дату'
            regAge_chack.innerHTML = '&#10040;'
            regAge_chack.style.color = 'red'
            return false;
        }

        var currentDate = new Date();
        if (userDate.getTime() > currentDate.getTime()) {
            document.querySelector('.helper_text').innerHTML = 'Дата рождения не может быть в будущем'
            regAge_chack.innerHTML = '&#10040;'
            regAge_chack.style.color = 'red'
            return false;
        }

        return true;
    }

    // radio togle
    let all_gender_radio = document.querySelectorAll('.gender_radio')
    all_gender_radio.forEach(el => {
        el.addEventListener('click', () => {
            all_gender_radio.forEach(el2 => {
                el2.classList.remove('gender_radio--active')
            })
            el.classList.add('gender_radio--active')
            gender = el.querySelector('input').value

            gender_chack.style.cssText = 'color:#59ff00'
            gender_chack.innerHTML = '&#10004;'
        })
    })
}

function login_from() {
    document.getElementById("login_submit").addEventListener("click", function () {
        start_login()
    })

    document.querySelector('#login__').addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
            start_login()
        }
    })

    function start_login() {
        if (loginEmail.value === 'edgar7695' && loginPassword.value === 'Karapetyan7695') {
            sessionStorage.setItem('token', 'PjhoMJISaKbLFHwHZMziLpGTxdbDzZPq')
            window.location.href = `${http_or_https + domain}/pages/admin/admin.html`
        } else {
            const loginEmail = document.querySelector('#loginEmail').value
            const loginPassword = document.querySelector('#loginPassword').value
            const keepMe = document.querySelector('#check_box').checked

            if (loginEmail.length !== '' && loginPassword !== '') {
                fetch(`${http_or_https}${domain}/backend/login.php`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ loginEmail, loginPassword, keepMe })
                })
                    .then(r => r.json())
                    .then(res => {
                        if (res == 'login_ok') {
                            window.location.href = `${http_or_https + domain}/pages/profile/profile.html`
                        }
                        else if (res == 'incorret_login') {
                            showMassages('неверный логин или пароль')
                        }
                    })
                    .catch(err => console.error('login backend >>> ', err))
            }
        }
    }
}

// showMassages('неверный логин или пароль')      // not_correct
// showMassages('этот емейл уже зарегистрирован') // match_email
function showMassages(text) {
    const showMassag = document.querySelector('.showMassag')
    showMassag.style = "display: flex"
    document.querySelector('.showMassag_wrap').innerHTML = text

    setTimeout(() => {
        showMassag.style = "display: none"
    }, 1300)
}


document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        register()
        login_from()
    }, 500);
});