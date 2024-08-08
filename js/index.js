

// ========================main-page================

var tabcontents = document.getElementsByClassName("tab-content");
var tablinks = document.getElementsByClassName("tab-links");
var sidemenu = document.getElementById("menu");
var bool = true;
function opentab(tabname){
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active");
    }
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active");
}
function homeclk(){
    document.getElementById("home").click();
}
function menu(){
    if(bool){
        sidemenu.style.right = "-100px";
        bool = false;
    }
    else{
        sidemenu.style.right = "-200px";
        bool = true;
    }
}

// ==========================page-1====================


function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}
function GeneratePassword(){
    let passwordlenth = document.getElementById("lenth").value;
    if(passwordlenth > 50){
        passwordlenth = 50;
    }
    if(passwordlenth < 1){
        passwordlenth = 1;
    }
    const includeupper = document.getElementById("uppercase").checked;
    const includelower = document.getElementById("lowercase").checked;
    const includenumbers = document.getElementById("numbers").checked;
    const includesymbols = document.getElementById("symbols").checked;

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+=-{}|;.,/][:><~";
    let password = "";
    let allowedChars = "";

    allowedChars += includeupper ? upperChars : "";
    allowedChars += includelower ? lowerChars : "";
    allowedChars += includenumbers ? numberChars : "";
    allowedChars += includesymbols ? symbolChars : "";
    if(allowedChars === ""){
        alert("you must select at least one option");
    }
    else{
        for(let i = 0; i < passwordlenth; i++){
            const randomIndex = getRndInteger(0, allowedChars.length);
            password += allowedChars[randomIndex];
        }
        document.getElementById("result").value = password;
    }
}
function mycopy(){
    var copyText = document.getElementById("result");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  }

// ========================page-2===================

const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const reserBtn = document.querySelector("#reset-btn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#d9d9d9";
const snakeColor = "#33ff33";
const snakeBorder = "black";
const foodColor = "#ff1a1a";
const unitSize = 15;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];




window.addEventListener("keydown", changeDirection);
reserBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    document.getElementById("reset-btn").disabled = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100 - score);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodx = randomFood(0, gameWidth - unitSize);
    foody = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodx, foody, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodx && snake[0].y == foody){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.stokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
    running = false;
document.getElementById("reset-btn").disabled = false;

};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
//-----------phone version -----------------//
function simulateKey (keyCode, type, modifiers) {
	var evtName = (typeof(type) === "string") ? "key" + type : "keydown";	
	var modifier = (typeof(modifiers) === "object") ? modifier : {};

	var event = document.createEvent("HTMLEvents");
	event.initEvent(evtName, true, false);
	event.keyCode = keyCode;
	
	for (var i in modifiers) {
		event[i] = modifiers[i];
	}

	document.dispatchEvent(event);
}

// =================================page-3========================

