//referance for the code: https://www.youtube.com/watch?v=uHVPAcaW1VQ
const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector('.timer');

//input
let hr = 0;
let min = 1;
let sec = 0;

let hours = hr * 36000000;
let minutes = min * 60000;
let seconds = sec * 1000;
let setTime = hours + minutes + seconds;
let startTime  = Date.now();
let futureTime = startTime + setTime;
let timerLoop = setInterval(countDownTimer);
countDownTimer();
var audio = new Audio("./notification.mp3");

function countDownTimer() {

      Notification.requestPermission().then((perm) => {
      });

    let currentTime = Date.now();
    let remainingTime = futureTime - currentTime;
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
    let hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    let mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    let secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    timer.innerHTML = `
    <div class="text-center">${mins}</div>
    <div class="colon">:</div>
    <div class="text-center">${secs}</div>
    <p class="inqueue-minutes">Minutes left</p>
    `;
    
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

        //alert
        document.getElementById("alert").innerHTML += `
        <div class="alert-background">
            <div class="alert-box">
                <h2>Hey, the estimated time ran out have you been invited to your GP’s cabinet?</h2>
                <div class="alert-buttons">
                    <a href="./finish.html" class="alert-link">
                    <button class="alert-yes">Yes</button>
                    </a>
                    <button class="alert-no" onclick="addTime()">No</button>
                </div>
            </div>
        </div>
        `;
        
        notification = new Notification("Time is up!", {
          body: "Estimated time ran out.",
          icon: "./images/user-doctor-solid.svg",
          vibrate: [200, 100, 200],
        },
        audio.play()
        );
        
    }
}

function addTime(){
    min = 5;
    sec = 0;
    minutes = min * 60000;
    seconds = sec * 1000;
    setTime = hours + minutes + seconds;
    startTime = Date.now();
    futureTime = startTime + setTime;
    timerLoop = setInterval(countDownTimer);
    document.getElementById("alert").innerHTML = ""
    countDownTimer();
}