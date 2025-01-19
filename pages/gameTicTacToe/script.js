// ------------------------------------------------------
// Array.prototype.join = Array.prototype.shift         -
// String.prototype.match = () => {}                    -
//                                                      -
// let a = [1, 2, 3]                                    -
// console.log(a.join(), a == '1,2,3')                  -
// a.join = a.shift                                     -
//                                                      -
// if (a == 1 && a == 2 && a == 3) {                    -
//     console.log('ok')                                -
// }                                                    -
// ------------------------------------------------------
//___________________________________________________________cod 1______________________________________________________________________
// const buttons = document.querySelectorAll('.buttons')
// const arrMatrix = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];
// let player = 'X';
// let resalt = ['', '', '', '', '', '', '', '', ''];
// buttons.forEach((el, index) => {
//     el.addEventListener('click', () => {
//         if (!el.textContent) {
//             el.textContent = player
//             resalt[index] = player
//         }
//         for (let i = 0; i < arrMatrix.length; i++) {
//             const winChecked = arrMatrix[i]
//             const a = resalt[winChecked[0]]
//             const b = resalt[winChecked[1]]
//             const c = resalt[winChecked[2]]
//             if (!a && !b && !c) {
//                 continue
//             }
//             if (a === b && b === c) {
//                 document.body.innerHTML += `win player ${player}`
//                 break
//             }
//         }
//         player = player == 'X' ? 'O' : 'X'
//     })
// })

// // ___________________________________________________________cod 2______________________________________________________________________

const
    game__bord = document.querySelectorAll('.buttons'),
    win_popup = document.querySelector('.win_popup'),
    win_popup_text = document.querySelector('.win_popup_text'),
    btn_new_gmae = document.querySelector('.btn_new_gmae'),
    button_ok = document.querySelector('.button_ok'),
    player_0 = document.querySelector('.player_0'),
    player_X = document.querySelector('.player_X');

let
    res = 'X',
    gamerX = '',
    gamer0 = '',
    check_x = 0,
    check_0 = 0;

game__bord.forEach((item, i) => {
    const inText = item.querySelector('.buttons_texts')
    //_____________continue______________
    button_ok.addEventListener('click', () => {
        win_popup.setAttribute('style', 'display: none;')
        reset()
    })
    //_____________reset game____________
    btn_new_gmae.addEventListener('click', () => {
        reset()
        localStorage.clear()
        player_0.textContent = 0;
        player_X.textContent = 0;
        check_x = 0;
        check_0 = 0;
    })
    // ______________reset______________
    function reset() {
        inText.textContent = '';
        gamerX = '';
        gamer0 = '';
        res = 'X';
    }
    item.addEventListener('click', () => {

        if (inText.textContent === '') {
            //_____________gamer 1_____________
            if (res === 'X') {
                inText.textContent = 'X'
                gamerX += i
                logic(gamerX, 'Player <span>X</span> win')

                inText.classList.add('animFrom_X')
                inText.classList.add('animate__bounceIn')
                setTimeout(() => {
                    inText.classList.remove('animFrom_X')
                    inText.classList.remove('animate__bounceIn')
                }, 800);

                res = 'O';
            }
            //_____________gamer 2_____________
            else if (res === 'O') {
                inText.textContent = 'O'
                gamer0 += i
                logic(gamer0, 'Player <span>O</span> win')

                inText.classList.add('animFrom_O')
                inText.classList.add('animate__bounceIn')
                setTimeout(() => {
                    inText.classList.remove('animFrom_O')
                    inText.classList.remove('animate__bounceIn')
                }, 800);

                res = 'X';
            }
        }
    })
})

function logic(gamers, text) {
    if (gamers.match('0') && gamers.match('1') && gamers.match('2'))
        return alertgameover(text)

    if (gamers.match('3') && gamers.match('4') && gamers.match('5'))
        return alertgameover(text)

    if (gamers.match('6') && gamers.match('7') && gamers.match('8'))
        return alertgameover(text)

    if (gamers.match('0') && gamers.match('3') && gamers.match('6'))
        return alertgameover(text)

    if (gamers.match('1') && gamers.match('4') && gamers.match('7'))
        return alertgameover(text)

    if (gamers.match('2') && gamers.match('5') && gamers.match('8'))
        return alertgameover(text)

    if (gamers.match('0') && gamers.match('4') && gamers.match('8'))
        return alertgameover(text)

    if (gamers.match('2') && gamers.match('4') && gamers.match('6'))
        return alertgameover(text)

    if (gamers.length == 5)
        alerteven()
}

function alerteven() {
    win_popup.setAttribute('style', 'display: flex;')
    win_popup_text.innerHTML = 'Even'
}

function alertgameover(text) {
    win_popup.setAttribute('style', 'display: flex;')
    win_popup_text.innerHTML = text

    if (text == 'Player X win') {
        document.querySelector('.player_X').innerHTML = check_x += 1;
        localStorage.setItem('check_x', check_x)
    } else {
        document.querySelector('.player_0').innerHTML = check_0 += 1;
        localStorage.setItem('check_0', check_0)
    }
}

window.onload = () => {
    if (localStorage.getItem('check_x', check_x) != null) {
        player_X.textContent = localStorage.getItem('check_x', check_x)
    }
    if (localStorage.getItem('check_0', check_0) != null) {
        player_0.textContent = localStorage.getItem('check_0', check_0)
    }
}