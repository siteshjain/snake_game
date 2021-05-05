const cvs=document.getElementById('snake');
const ctx=cvs.getContext("2d");
const box=32;
const ground=new Image();
ground.src="images/ground.png";
const foodimg=new Image();
foodimg.src="images/food.png";
const dead=new Audio();
const eat=new Audio();
const down=new Audio();
const left=new Audio();
const right=new Audio();
const up=new Audio();
dead.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
down.src="audio/down.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";
up.src="audio/up.mp3";
let snake=[];
snake[0]={
    x: 9*box,
    y: 10*box,
}
let food={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box
}
let score=0;
let d;
document.addEventListener("keydown",direction)
function direction(event){
     if(event.keyCode==37&&d!="RIGHT"){
        d="LEFT";
        left.play();
    }
    else if(event.keyCode==38&&d!="DOWN"){
        d="UP";
        up.play();
    }
    else if(event.keyCode==39&&d!="LEFT"){
        d="RIGHT";
        right.play();
    }
    else if(event.keyCode==40&&d!="UP"){
        d="DOWN";
        down.play();
    }
}
function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x==array[i].x&&head.y==array[i].y){
            return true;
        }
    }
    return false;

}

let high_score=localStorage.getItem("high_score");
if(high_score===null)
{
     hivalue=0;
    localStorage.setItem("high_score",JSON.stringify(hivalue))
}else{
    hivalue=JSON.parse(high_score);
    ctx.fillText(high_score,17*box,1.6*box);
}


function draw(){
    ctx.drawImage(ground,0,0);
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle=(i==0)?"blue":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodimg,food.x,food.y);
    let snakeX=snake[0].x;
let snakeY=snake[0].y;
if(snakeX==food.x&&snakeY==food.y){
    eat.play();
    score++;
    if(score>hivalue){
        hivalue=score;
        localStorage.setItem("high_score",JSON.stringify(hivalue))
        ctx.fillText(hivalue,17*box,1.6*box);
    }
    food={
        x:Math.floor(Math.random()*17+1)*box,
        y:Math.floor(Math.random()*15+3)*box
    }
}
else{
    snake.pop();
}


if(d=="LEFT") {snakeX-=box}
if(d=="UP") {snakeY-=box}
if(d=="RIGHT") {snakeX+=box}
if(d=="DOWN") {snakeY+=box}

let newhead={
    x:snakeX,
    y:snakeY
}
if(snakeX<box||snakeX>17*box||snakeY<3*box||snakeY>17*box||collision(newhead,snake)){
    clearInterval(game);
    dead.play();
}

snake.unshift(newhead)
ctx.fillStyle="white";
ctx.font="45px Sansserif";
ctx.fillText(score,2*box,1.6*box);
ctx.fillText("HIGH-SCORE:",7*box,1.6*box);
ctx.fillText(hivalue,17*box,1.6*box);
   
}
let game=setInterval(draw,100);