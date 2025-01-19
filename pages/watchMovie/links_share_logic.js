let href = decodeURI(window.location.href)

if (href.match('_')) {
    window.location.href = window.location.href.replaceAll('_', ' ');
} else {
    let newUrl = href.replaceAll(' ', '_');

    document.getElementById('links__share__cont').innerHTML = `
        <div class="links__share--items">
            <a href="https:/vk.com/share.html?url=${newUrl}" target="_blank">
                <img src="../../assets/share_links/vkontakte.png" alt="vkontakte" title="vkontakte">
            </a>
        </div>
        <div class="links__share--items">
            <a href="https:/t.me/share/url?url=${newUrl}" target="_blank">
                <img src="../../assets/share_links/telegram.png" alt="telegram" title="telegram">
            </a>
        </div>
        <div class="links__share--items">
            <a href="https://api.whatsapp.com/send?text=${newUrl}" target="_blank">
                <img src="../../assets/share_links/whatcapp.png" alt="whatcapp" title="whatcapp">
            </a>
        </div>
        <div class="links__share--items">
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=${newUrl}" target="_blank">
                <img src="../../assets/share_links/linkedin.png" alt="linkedin" title="linkedin">
            </a>
        </div>
        <div class="links__share--items">
            <a id="copiBtn" class="copiBtn">
                <img class="copiBtn-img" src="../../assets/share_links/copy-icon.png" alt="copy" title="copy">
            </a>
        </div>
    </div>`
}

document.querySelector("#copiBtn").addEventListener("click", function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
        console.log('Text copied to clipboard');
        showMassages('текст скопирован в буфер обмена')
    }).catch(function (error) {
        console.error('Error:', error);
    });
});

function showMassages(text) {
    const showMassag = document.querySelector('.showMassag')
    showMassag.style = "display: flex"
    document.querySelector('.showMassag_wrap').innerHTML = text

    setTimeout(() => {
        showMassag.style = "display: none"
    }, 1000)
}


/* <div class="links__share--items">
<a href="https:/www.facebook.com/sharer/sharer.html?u=${newUrl}" target="_blank">
    <img src="../../assets/share_links/facebook.png" alt="facebook" title="facebook">
</a>
</div> */