//referance for the code: https://www.youtube.com/watch?v=uHVPAcaW1VQ
const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector('.timer');

//input
const hr = 0;
const min = 0;
const sec = 0;

const hours = hr * 36000000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const startTime  = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    //progress indicator
    if(angle > 180){
        semicircles[2].style.display = "none";
        semicircles[0].style.transform = "rotate(180deg)";
        semicircles[1].style.transform = `rotate(${angle}deg`;
    } else {
        semicircles[2].style.display = "block";
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg`;
    }

    //timer
    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    timer.innerHTML = `
    <div class="text-center">${mins}</div>
    <div class="colon">:</div>
    <div class="text-center">${secs}</div>
    <p class="inqueue-minutes">Minutes left</p>
    `;


    //5sec-condition



    //end
    if(remainingTime < 0) {
        clearInterval(timerLoop);
        semicircles[0].style.display = "none";
        semicircles[1].style.display = "none";
        semicircles[2].style.display = "none";

        timer.innerHTML = `
        <div class="text-center">00</div>
        <div class="colon">:</div>
        <div class="text-center">00</div>
        <p class="inqueue-minutes">Minutes left</p>
        `;
    }
}