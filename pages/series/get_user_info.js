fetch('../../backend/profile.php', {
    method: 'get',
    headers: { 'Content-Type': 'application/json', },
})
    .then(r => r.json())
    .then(data => {
        if (data.user != 'not registered') {
            document.querySelector('.head-top-nav-items-login').classList.add('head-top-nav-items-login--active')
            document.querySelector('.user-nameShow').textContent = data.name[0]
            document.querySelector('#login').remove()
        }
    })
    .catch(r => console.log(r))
