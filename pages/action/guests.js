function call() {
    fetch('../../backend/guests.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', },
    })
        .catch(r => console.log(r))
}

call()

let lastTime = 0;
const interval = 1000; // 3 секунды в миллисекундах

function animate(currentTime) {
    if (currentTime - lastTime >= interval) {
        call()
        // Сброс времени
        lastTime = currentTime;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);