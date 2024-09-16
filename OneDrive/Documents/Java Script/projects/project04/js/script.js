// Game constants & Variables
let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const GameOver=new Audio('game-over.mp3');
const moveSound=new Audio('snake-move.mp3');
const musicSound=new Audio('game-music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};


// Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}
function isCollide(snake){
    // If you bump into yourself
    for (let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
            return true;
        }
    }
    // if you bump to the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
        return false;
}

function gameEngine(){
    // Part 1:Updating the snake array & Food
    if(isCollide(snakeArr)){
        moveSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;

    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHtml="Hiscore:0"+hiscoreval;

        }
        scoreBox.innerHtml="score" + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a= 2;
        let b= 16;
        food={x:Math.round(a+(b-a)*Math.round()),y:Math.round(a+(b-a)*Math.round())}

    }
    // Moving the Snake
    for(let i =snakeArr.length-2; i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    // Part 2:Display the snake and Food
    // Display the Snake
    board.innerHtml="";
    snakeArr.forEach((e,index)=>{
        snakeElemenet=document.createElement('div');
        snakeElemenet.style.gridRowStart=e.y;
        snakeElemenet.style.gridColumnStart=e.x;
        if(index===0){
            snakeElemenet.classList.add('head');
        }
        else{
            snakeElemenet.classList.add('snake');

        }
        
        board.appendChild(snakeElemenet);
    });
    // Display the Food
    snakeArr.forEach((e,index)=>{
        foodElemenet=document.createElement('div');
        foodElemenet.style.gridRowStart=food.y;
        foodElemenet.style.gridColumnStart=food.x;
        foodElemenet.classList.add('food')
        board.appendChild(foodElemenet);
    });
}



// Main logic starts here
// moveSound.play();
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));

}
else{
    hiscoreval=JSON.parse(hiscore)
    hiscoreBox.innerHtml="Hiscore:0"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//Start  the Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1 ;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});