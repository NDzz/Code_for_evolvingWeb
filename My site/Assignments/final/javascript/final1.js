var canvas;
var ctx;
var w = 600;
var h = 700;
var score = 0;
var increase = 5;
// var requestID = window.requestAnimationFrame(animate);
var ballImg = document.createElement('img');
ballImg.src = "images/ball.png";
var goalieImg = document.createElement('img');
goalieImg.src = "images/Goalkeeper.png";

/////variables for gameplay
var goalie = {
	"x": 300,
	"y": 630,
	"dx": 6,
	"dy": 6,
	"r": 50,
	"c": "black",
}
var goal = {
	"x": 164,
	"y": 695,
	"l": 272,
	"w": 5,
}
var ball = [];

//////////declaring variables for keyboard
var down = false;
var up = false;
var right = false;
var left = false;

// Keyboard actions for keydown
addEventListener('keydown', function(event) {
  event.preventDefault();
  if (event.keyCode === 40) {down = true;}
  if (event.keyCode === 38) {up = true;}
  if (event.keyCode === 37) {left = true;}
  if (event.keyCode === 39) {right = true;}
});
// Keyboard actions for keyup
addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 40) {down = false;}
  if (event.keyCode === 38) {up = false;}
  if (event.keyCode === 37) {left = false;}
  if (event.keyCode === 39) {right = false;}
});

setUpCanvas();

createBall(1);
animationLoop();

//////FUNCTIONS
function animationLoop(){
	clear();
	scoreDisplay();
	markings();
	drawSprite(goalie);
	drawAllBall();

	///////////code for controlling the goalie with keyboard
	if (down) {goalie.y += goalie.dy;}
	if (up)   {goalie.y -= goalie.dy;}
	if (right){goalie.x += goalie.dx;}
	if (left) {goalie.x -= goalie.dx;}

	//////////goalie's limited movements
	if (goalie.y + goalie.r > canvas.height)	{goalie.y = canvas.height - goalie.r;}
	if (goalie.y 		    < 535)    			{goalie.y = 535;}
	if (goalie.x 			< 75)     			{goalie.x = 75;}
	if (goalie.x + goalie.r > 525)    			{goalie.x = 525 - goalie.r;}

	requestAnimationFrame(animationLoop);
}

function markings(){
	Square(80,570,440,200);//big square
	Square(160,650,280,105);//small square
	dot(w/2,h/2,7);///mid dot
	dot(w/2,610,7);//goal dot
	lines();
	midCircle();
	endSquare(goal);
}

function drawAllBall(){
	for(var i = 0; i < ball.length; i++){
		drawBall(ball[i]);

	//ball's movement
		ball[i].x += ball[i].dx;
		ball[i].y += ball[i].dy;

	///ball rebound from canvas's border
		if(ball[i].x + ball[i].r > w || ball[i].x - ball[i].r/15 < 0)   {ball[i].dx *= -1};
		if(ball[i].y + ball[i].r > h || ball[i].y - ball[i].r/15 < 0)   {ball[i].dy *= -1};

	////collision for ball and goalie
		if( goalie.x > ball[i].x-ball[i].r-10  	&&
			goalie.x < ball[i].x+ball[i].r-10	&& 
			goalie.y > ball[i].y-ball[i].r-10  	&&
			goalie.y < ball[i].y+ball[i].r-10){

				ball[i].dy = -ball[i].dy;
				ball[i].dx = -ball[i].dx;
				score++;
				createBall(1);
		}

	/////collision to declare gameover
		if( goal.x + goal.l > ball[i].x+10 &&
			goal.y + goal.l > ball[i].y &&
			goal.y + goal.w < ball[i].y+ball[i].r &&
			goal.x + goal.w < ball[i].x+ball[i].r ){
			gameover();
			ball[i].dx = 0;
			ball[i].dy = 0;
			ball[i].pop(10000);
		}
	}
}

function createBall(num){
	for(var i = 0; i<num; i++){
		ball.push({
		"x": w/2,
		"y": 300,
		"dx": (rand(10)-increase),
		"dy": (rand(10)-increase),
		"r": 30,
		})
	}
}

///////////////////////////////////////////////
function gameover() {
	clear();
	ctx.fillStyle = '#000000';
	ctx.font = '24px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('GAMEOVER!!',w/2,h/4);
	ctx.fillText('Final Score:'+score,w/2,h/2);
	// alert("GAMEOVER!!")document.location.reload();
}

function scoreDisplay(){
	ctx.fillStyle = '#000000';
	ctx.font = '24px Arial';
	ctx.textAlign = 'left';
	ctx.fillText('Saves: ' + score, w/2-40, 24);
}

////////functions to draw the pitch
function lines(){
	ctx.beginPath();
	ctx.moveTo(0,h/2);
	ctx.lineTo(w,h/2);
	ctx.lineWidth="3";
	ctx.strokeStyle = "white"
	ctx.stroke();
}
function midCircle(){
	ctx.beginPath();
	ctx.arc(w/2,h/2,80,0,2*Math.PI);
	ctx.lineWidth="3";
	ctx.strokeStyle = "white"
	ctx.stroke();
}
function dot(x,y,s){
	ctx.beginPath();
	ctx.arc(x,y,s,0,2*Math.PI);
	ctx.fillStyle = "white"
	ctx.fill();
}
function Square(x,y,h,w){ 
	ctx.beginPath(); 
	ctx.rect(x,y,h,w);
	ctx.lineWidth="3";
	ctx.stroke();
}
function endSquare(o){
	ctx.beginPath();
	ctx.rect(o.x, o.y, o.l, o.w);
	ctx.fillStyle = "#52D150";
	ctx.fill();
}

function animate() {
		requestID = requestAnimationFrame(animate);
}
//////////////////////////////////

function clear (){
	ctx.clearRect(0,0,w,h);
}
function rand(num){
	var result = Math.random()*num;
	return result
}
function drawBall(o){
	ctx.beginPath();
	ctx.drawImage(ballImg, o.x, o.y, o.r, o.r);
	ctx.fill();
}
function drawSprite(o){
	ctx.beginPath();
	// ctx.arc(o.x,o.y,o.r,0,2*Math.PI);
	ctx.drawImage(goalieImg, o.x, o.y, o.r,o.r);
	ctx.fillStyle = o.c;
	ctx.fill();
}
function setUpCanvas(){
	canvas = document.querySelector("#canvas")
	canvas.width = w;
	canvas.height = h;
	canvas.style.border = "2px solid black";
		canvas.style.background = "#52D150";
	ctx = canvas.getContext("2d");
}

// Sources used:
// https://stackoverflow.com/questions/4276048/html5-canvas-fill-circle-with-image
// http://bencentra.com/2017-07-11-basic-html5-canvas-games.html
// https://www.youtube.com/watch?v=789weryntzM&t=1454s
// https://www.w3schools.com/
// http://www.clipartpanda.com/clipart_images/soccer-ball-clip-art-352410