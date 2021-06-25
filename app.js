const startBtn = document.getElementById("start");
const screens = document.querySelectorAll(".screen");
const timeList = document.getElementById("time-list");
const timer = document.getElementById('time');
const board = document.getElementById('board');
const colors = ['red','blue','yellow','green','white','pink'];
let score = 0;
let interval;
let time = 0;
startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});
timeList.addEventListener("click", (event) => {

    if (event.target.classList.contains('time-btn')) {
        time = +event.target.getAttribute("data-time");
        timer.innerText = `00: ${time}`;
        startGame();
        screens[1].classList.add('up');
    }
});
board.addEventListener("click", (event) => {
    if (event.target.classList.contains('circle')) {
        event.target.remove();
        score++;
        createRandomCircle();
    }
});

function startGame() {
    createRandomCircle();
    interval = setInterval(decreaseTime, 1000)

}

function finishGame() {
    timer.parentNode.remove();
    board.innerText = `Cчет ${score}`;
    clearInterval(interval);
}

function decreaseTime() {
    if (time < 10) {
        timer.innerText = `00: 0${time}`;
    } else {
        timer.innerText = `00: ${time}`;
    }
    time--;
    if (time === 0) {
        finishGame();
    }
}

function createRandomCircle() {
    const circle = document.createElement("div");
    circle.classList.add('circle');
    const size = getRandomSize(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomSize(0, width - size);
    const y = getRandomSize(0, height - size);
    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.top = y + "px";
    circle.style.left = x + "px";
    circle.style.background =colors[getRandomSize(0,colors.length)];
    board.append(circle);
}

function getRandomSize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

}
