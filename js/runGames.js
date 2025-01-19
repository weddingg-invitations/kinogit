let logo_click = 0
document.getElementById('top_movies').addEventListener('click', () => {
    logo_click++
    if (logo_click >= 10) {
        let domain = (new URL(window.location.href)).hostname;
        let http_or_https = 'http://'

        if (domain.indexOf('.') > 0)
            http_or_https = 'https://'

        window.location.href = `${http_or_https + domain}/pages/gameTicTacToe/game.html`
        logo_click = 0
    }
})