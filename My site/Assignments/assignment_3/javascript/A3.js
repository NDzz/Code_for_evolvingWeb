var canvas
var ctx;
var w = 600;
var h = 600;
var l = 600;
var t = 600;
var particles = {};
var particleIndex = 0;
var particlesNum = 50;
var colours = ["red", "sky blue", "white", "cyan","teal", "aqua", "blue"];
var obj2 = { //bounces around upon impact
	"x": 380,
	"dx": rand(5),
	"y": 160,
	"dy": rand(5)-2.5,
	"r": 10,
	"c": "white",
}

/////
setUpCanvas();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,w,h);

////////
setInterval(function(){
	w += 0;
	h += 1;

	l -= 0;
	t -= 1;

	for(var i = 0; i<2;i++){
	lineH(h/2,(w/2)-225,5);////top long line
	lineH(t/2,(l/2)-155,5);////mid line
	lineH(h/2-80,(w/2)-75,5);/////bottom long line
	lineH(h/2,(w/2)-35,5);/////bottom short line

	lineV((w/2)-80,(h/2)-155,5);///left line
	lineV((w/2)+40,(h/2)-75,5);///mid-right line(short)
	lineV((w/2)+150,(h/2)-225,5);///right line
	lineV(w/2,(h/2)-225,5);///mid-left line (long)

	Square(0        ,135	   ,215,300);///left square
	Square((300)-85 ,230	   ,80 ,h);///2nd left bottom square
	Square((300)-10	,270	   ,55 ,h);///mid-left square
	Square((300)+45 ,230	   ,175 ,h);///mid-right square
	Square((300)+155,(300)-230 ,200,200);///right square
	Square(0,0 ,w,70);///top square
	Square(0,70 ,295,70);///top left square
}

///referencing the coding below from YOUTUBE.com and 
//https://www.youtube.com/watch?v=YCI8uqePkrc&t=969s
////(
	ctx.fillStyle = "black";
	ctx.fillRect(0,270,w,h);
	for (var i in particles){
		particles[i].draw();
	}

	Particle.prototype.draw = function(){
		this.x += this.vx;
		this.y += this.vy;
		this.life ++;
		if (this.life>=this.maxLife){
			delete particles[this.id];
		}

		ctx.fillStyle = colours[randi(6)];
		ctx.fillRect(this.x,this.y, 10, 10);
	}

	for (var i = 0; i < particlesNum; i++){
	new Particle();
		}
////)
drawCircle(obj2);

DI();
FU();

//makes the object move
	obj2.x = obj2.x + obj2.dx;
	obj2.y = obj2.y + obj2.dy;
	
//makes the object rebound
	if(obj2.x > 440 || obj2.x < 310){obj2.dx = obj2.dx * (-1)}//bounce from lines
	if(obj2.y > 220 || obj2.y < 80){obj2.dy = obj2.dy * (-1)}

}, 10)
///////

OC();
AD();
U();

///////
function Particle(){
	this.x = w/2;
	this.y = h-60;
	this.vx = Math.random() * 20 - 10;
	this.vy = Math.random() * 20 - 5;
	particleIndex++;
	particles[particleIndex] = this;
	this.id = particleIndex;
	this.life = 0;
	this.maxLife = Math.random() * 60;
	}

function drawCircle(o){
	ctx.beginPath();
	ctx.arc(o.x,o.y,o.r,0,2*Math.PI);
	ctx.fillStyle = o.c;
	ctx.fill();
}

function DI(){
	ctx.font = "20px Arial";
	ctx.fillStyle = "aqua";
	ctx.fillText("Digital", 320, 110);
}
function FU(){
	ctx.font = "20px Arial";
	ctx.fillStyle = "aqua";
	ctx.fillText("Futures", 320, 130);
}

function OC(){
	ctx.font = "28px Arial";
	ctx.fillStyle = "aqua";
	ctx.fillText("O C", 235, 179);
}

function AD(){
	ctx.font = "28px Arial";
	ctx.fillStyle = "aqua";
	ctx.fillText("A D", 237, 211);
}

function U(){
		ctx.font = "23px Arial";
		ctx.fillStyle = "aqua";
		ctx.fillText("U", 312,253);
}

function lineV(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,5,0,2*Math.PI)
	ctx.fillStyle = "white";
	ctx.fill();
}

function lineH(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();
}

function Square(x,y,h,w,c){  ///squares to stop the white lines
	ctx.beginPath();
	ctx.rect(x,y,h,w);
	ctx.fillStyle = "black";
	ctx.fill();
}

function randi(num){
	var result = Math.round(Math.random()*num);
	return result
}

function rand(num){
	var result = Math.random()*num;
	return result
}

function clear (){
	ctx.clearRect(0,0,w,h);
}

function setUpCanvas(){
	canvas = document.querySelector("#canvas");
	canvas.width = w;
	canvas.height = h;
	canvas.style.border = "2px solid aqua";
	ctx = canvas.getContext("2d");
}