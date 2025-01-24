const display = document.querySelector("#timeDisplay");
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const secondsInput = document.querySelector("#seconds");
const message = document.querySelector("#message");

let countdown;
let totalTime;
let isRunning = false;

function start() {
    if (isRunning) return;

    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (totalTime > 0) {
        isRunning = true;
        countdown = setInterval(update, 1000);
        message.textContent = '';  
    } else {
        alert("Please enter a valid time.");
    }
}

function reset() {
    clearInterval(countdown);
    isRunning = false;
    display.textContent = "00 : 00 : 00";
    message.textContent = '';  
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

function stop() {
    clearInterval(countdown);
    isRunning = false;
}

function update() {
    if (totalTime <= 0) {
        clearInterval(countdown);
        display.textContent = "00 : 00 : 00";
        message.textContent = "Time's up!";  
        isRunning = false;
        return;
    }

    totalTime -= 1000;

    let hours = Math.floor(totalTime / (1000 * 60 * 60));
    let minutes = Math.floor((totalTime / (1000 * 60)) % 60);
    let seconds = Math.floor((totalTime / 1000) % 60);

    display.textContent = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}