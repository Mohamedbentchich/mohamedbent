
const display = document.getElementById("display");
const starBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
var sound = new Audio('sounds/ping-82822.mp3')
var isrunning = false
var iswork = true
let timer = null;
var seconds = 0;
var minutes = 25;
function start(){
    if (isrunning){
        starBtn.textContent = "▶"
        stopBtn.textContent = "⏹"
        starBtn.style.fontSize = "30px"
        stopBtn.style.fontSize = "40px"
        clearInterval(timer);
        isrunning = false
    } else {
        starBtn.textContent = "⏸"
        stopBtn.textContent = "▶▶"
        starBtn.style.fontSize = "40px"
        stopBtn.style.fontSize = "30px"
        timer = setInterval(update, 1000)
        isrunning = true
    }
    
    
}
function stop(){
    if (isrunning) {
        if (iswork) {
            minutes = 5
            seconds = 0
            iswork = false
            display.textContent = "05:00"
            
        } else {
            minutes = 25
            seconds = 0
            iswork = true
            display.textContent = "25:00"
        }
    } else {
        
        minutes = 25
        seconds = 0
        iswork = true
        display.textContent = "25:00"
    }
}
function update(){
    seconds--;
    if(seconds == -1){
        minutes--;
        seconds = 59;
    }
    seconds = String(seconds).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    display.textContent = `${minutes}:${seconds}`;
    if (minutes == 0 && seconds == 0) {
        sound.play()
        stop()
    }
}
