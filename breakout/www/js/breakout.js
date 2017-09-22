/**
* Breakout Game
* @author Joshua Sager
* @version 1.0
*/

//window.onload = init;
var stage;
var bricks = new Array();
var colors = ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,255,0)']
var STAGE_WIDTH = 500;
var STAGE_HEIGHT = 700;
var mouseX = 0;
var mouseY = 0;
var paddle = new Paddle(200,650,100,20);
var loopInterval = setInterval(loop,1000/30);
var ball = new Ball(150,200,10);
var gameState;
var posix = 200;
var geo = 0;
function onSuccess(heading) {
    posix = 250-25*heading.x
    geo =JSON.stringfy(heading);
};

function onError(compassError) {
    alert('Compass error: ' + compassError.code);
};

var options = {
    frequency: 300
}; // Update every 3 seconds


function init(){
	gameState = "loading";
	// events
	window.onmousemove = function(event){onMouseMoveHandler(event);}


 watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	initCanvas();
	drawBoard(30);
	gameState = "play";
}
function restart(){

	loopInterval = setInterval(loop,1000/30);
	ball.x=150
	ball.y=200

	bricks = new Array();
	drawBoard(30);
	gameState = "play";
}
function loop(){
	draw();
	hitTest();
}
/**
* Game State
*/
function checkGameState(){
	if(bricks.length==0){
		gameState = "win";
	}
	if(ball.y>STAGE_HEIGHT){
		gameState = "lose";
	}
	gameStateManager();
}
function gameStateManager(){
	switch(gameState){
		case "loading":
		break;

		case "play":
		break;

		case "win":
		pause();
		message("Winner");
		break;

		case "lose":
		pause();
		alert(posix+"\n"+geo);
		restart();
		
		break;
	}
}
function pause(){
	clearInterval(loopInterval);
}
function message(text){
	tag = document.createElement("h1");
	document.body.appendChild(tag);
	tag.innerHTML = text;
}
/**
* Drawing -- updates to graphics on screen
*/
function draw(){
	clearStage();
	paddle.update();
	updateBricks();
	ball.update();
	checkGameState();
}
/**
* Canvas
*/
function initCanvas(){
	canvas = document.createElement("canvas");
	context = canvas.getContext('2d');
	canvas.width=STAGE_WIDTH;
	canvas.height=STAGE_HEIGHT;
	document.body.appendChild(canvas);
	stage = context;
}
/**
* Board this creates a board full of bricks
* @param num this is the number of bricks to create
*/
function drawBoard(num){
	for(var i=0; i<num; i++){
		drawBrick();
	}
}
/**
* Brick creation and removal
*/
function removeBrick(num){
	//stage.clearRect(bricks[num].x,bricks[num].y,bricks[num].width,bricks[num].height);
	bricks.splice(num,1);
}
function createBrick(x,y,width,height){
	var brick = new Brick(x,y,width,height);
	bricks.push(brick);
}
/**
* Hit Test
*/
function hitTest(){

	// ball hit testing agains the bricks
	for(var i=0; i<bricks.length; i++){
		if(((ball.x >bricks[i].x))
			&& ((ball.x)<bricks[i].x + bricks[i].width) 
			&& (ball.y+ball.radius>bricks[i].y)
			&& (ball.y-ball.radius<bricks[i].y+bricks[i].height)
			){
			ball.hit();
			console.log("hit");
			removeBrick(i);
		}
	}

	// ball hit testing agains the paddle
	if((ball.x+ball.radius>paddle.x-paddle.width*.5)
		&&(ball.x-ball.radius<paddle.x+paddle.width*.5)
		&&(ball.y+ball.radius>paddle.y)
		&&(ball.y-ball.radius<paddle.y+paddle.height*.5)
		){
		console.log("paddle hit");
		ball.y=paddle.y-ball.radius;
		ball.hit();
		paddle.hit();
	}
}
/**
* Brick Drawaing - draws a brick on the stage
*/
function drawBrick(){
	var xoffset = 50;
	var yoffset = 20;
	var STARTING_VALUE = 10;
	var x = STARTING_VALUE;
	var y = 0;
	// if first brick
	if(bricks.length!=0){
		x = bricks[bricks.length-1].x;
		y=bricks[bricks.length-1].y;

		// at the edge move brick down
		if(bricks[bricks.length-1].x>STAGE_WIDTH-xoffset){
			y+=yoffset;
			x=STARTING_VALUE;
		}else{
			x+=xoffset;	
		}
	}
	createBrick(x,y,50,20);
}
function updateBricks(){
	for(var i=0; i<bricks.length; i++){
		bricks[i].update();
	}
}
/**
* Stage Methods 
*/
function clearStage(){
	stage.clearRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
}
/**
* Mouse Methods
*/
function getMousePosition(evt){
	var e = new MouseEvent(evt);
	var rect = canvas.getBoundingClientRect();
	mouseX = e.x - rect.left;
	mouseY = e.y;
}
function onMouseMoveHandler(evt){
	getMousePosition(evt);
}
/**
* MouseEvent Class
* Creates a global reference to the mouse position via mouseX and mouseY
*/
function MouseEvent(e){
	e?this.e=e:this.e=window.event;
	e.pageX?this.x=e.pageX:this.x=e.clientX;
	e.pageY?this.y=e.pageY:this.y=e.clientY;
}
/**
* Brick Class
*/
function Brick(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = colors[parseInt(Math.random()*colors.length)]

	this.update=function(){
		stage.fillStyle = this.color;
		stage.fillRect(this.x,this.y,this.width,this.height);
	}
}
/**
* Paddle Class
*/
function Paddle(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = 'rgb(100,100,100)';

	this.update = function(){
		this.x = posix;
		stage.fillStyle = this.color;
		stage.fillRect(this.x-this.width*.5,this.y,this.width,this.height);
	}
	// Logic for ball x direction on paddle hit test with ball
	this.hit = function(){
		var dist = (this.x+this.width)-this.x;
		var total = ball.radius*2+paddle.width;
		var hitpoint = (ball.x+ball.radius)-(paddle.x-paddle.width*.5)
		var percent = hitpoint/total;

		// The paddle is subdivided into sections that influence the direction reversal
		if(percent>=.48 && percent <=.52){
			ball.vx=ball.vy*0;
		}else if(percent>=.45 && percent <=.57){
			ball.vx= ball.vy * .10;
		}else if(percent>=.43 && percent <=.55){
			ball.vx= ball.vy * -.10;
		}else if(percent >= .25 && percent <= .44){
			ball.vx= ball.vy * .25;
		}else if(percent >= .56 && percent <= .75){
			ball.vx= ball.vy * -.25;
		}else if(percent>=.10 && percent <=.24){
			ball.vx=ball.vy * .5;
		}else if(percent>=.76 && percent <=.90){
			ball.vx=ball.vy*-.5;
		}else if(percent>=.0 && percent <=.09){
			ball.vx=ball.vy*1;
		}else if(percent>=.91 && percent <-1){
			ball.vx=ball.vy*-1;
		}
	}
}
/**
* Ball Class
*/
function Ball(x,y,radius){
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 10;

	this.radius = radius;
	this.color = 'rgb(100,100,100)';

	this.update = function(){
		this.y+=this.vy;
		this.x+=this.vx;
		this.bounds();
		stage.fillStyle = this.color;
		stage.beginPath();
		stage.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		stage.fill();
	}

	// keep the ball in bounds
	this.bounds = function(){
		if(ball.y-ball.radius<0){
			ball.y=0;
			this.hit();
		}
		if(ball.x>STAGE_WIDTH-ball.radius || ball.x<0){
			ball.vx*=-1;
		}
	}
	// reverse y direction 
	this.hit = function(){
		this.vy*=-1;
	}
}
