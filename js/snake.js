let inputDir = {x:0,y:0};
const foodMusic = new Audio('../music/food.mp3')
const gameoverMusic = new Audio('../music/gameover.mp3')
const move = new Audio('../music/move.mp3')
const backgroundMusic = new Audio('../music/music.mp3')
// board = document.getElementById('#board')
lastPaintTime = 0;
score = 0;
speed = 5;
snakeArr = [{x:13,y:15}]
food = {x:7,y:5}

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000  < 1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    if(snake[0].x >= 18 || snake[0].x <= 0 ||  snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
        
    return false;
}


function gameEngine(){
    //updating the snake array and food
    if(isCollide(snakeArr)){
        backgroundMusic.pause();
        gameoverMusic.play()
        inputDir = {x:0, y:0}
        alert(`Game over!! press any key to start the game and your score is ${score}`);
        snakeArr = [{x:13,y:15}]
        backgroundMusic.play();
        score = 0;
    }
    
    //Eating the food and growing the snake
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodMusic.play();
        score += 1;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
        
    }
    // moving the snake after eating the food
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    
    //display food and snake per frame
    //display the snake
    backgroundMusic.play();
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} 
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});