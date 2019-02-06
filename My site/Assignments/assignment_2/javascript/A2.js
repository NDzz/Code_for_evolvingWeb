/// Declare all global variables at the top
var ctx;
var canvas;
var w = 750;
var h = 500;

function setUpCanvas(){
	/// Access the canvas from the html with ID "shapes"
	var canvas = document.querySelector("#canvas");
	console.log (canvas);

	/// declaring the the value of "w" and "h" from function var
	canvas.width = w;
	canvas.height = h;

	/// border properties
	canvas.style.border = "2px solid aqua";

	/// get the context of the canvas -- this is what we draw to
	ctx = canvas.getContext("2d");
}
setUpCanvas(canvas);

bigSquare();
function bigSquare(){
	ctx.beginPath();
	ctx.moveTo(200,80);
	ctx.lineTo(200,250);
	ctx.lineTo(620,250);
	ctx.lineTo(620,80);
	ctx.lineTo(200,80);
	ctx.lineWidth="1.5";
	ctx.stroke();
}


/////
//bottom square
bSquare();
function bSquare(){
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.rect(400,300,280,130); 
	ctx.fillStyle="#7A4210";
	ctx.fill();
	ctx.strokeStyle="black";
	ctx.stroke();
}
OCAD();
function OCAD(){
	ctx.font = "25px Arial";
	ctx.fillStyle = 'aqua';
	ctx.fillText("OCAD U", 456, 350);
}
/////


//////////////////
triangle1(230	 ,250,10);
triangle1(230+360,250,10);
triangle1(230+80 ,250,10);

triangle2(230	 ,250,10);
triangle2(230+360,250,10);
triangle2(230+80 ,250,10);

function triangle1(a,b,c,d){
	ctx.beginPath();
	ctx.moveTo(a	,b);
	ctx.lineTo(a+c+5,b);
	ctx.lineTo(a-30 ,b+180);
	ctx.fillStyle="red";
	ctx.fill();
}

function triangle2(a,b,c,d){
	ctx.beginPath();
	ctx.moveTo(a+15,b);
	ctx.lineTo(a+30,b);
	ctx.lineTo(a+70,b+180);
	ctx.fillStyle = "yellow";
	ctx.fill();
}
/////////////////


///////
// three loops of the dark tinySquares as they they divided into three parts
for(var i =0; i<46; i++){
tinySquare(rand(w)+350,rand(h)+90,10);
tinySquare(rand(w)+460,rand(h)+90,10);
tinySquare(rand(w)+210,rand(h)+90,10);
}

// randomising the dark tinySquares in the bigSquare
function rand(num){
var result = Math.random()*150;
return result
}

function tinySquare(x,y,s){
x = x-s/2;
y = y-s/2;  
ctx.beginPath(); 
ctx.moveTo(x    , y); 
ctx.lineTo(x+s, y); 
ctx.lineTo(x+s, y+s); 
ctx.lineTo(x    , y+s); 
ctx.lineTo(x    , y); 
ctx.fillStyle="black";
ctx.fill();
}
////////

///////////
//var w = 750;
//var h = 500;
var grd=ctx.createRadialGradient(510,275,2,510,275,50);
grd.addColorStop(0,"blue");
grd.addColorStop(1,"black");

// Fill with gradient
ctx.fillStyle=grd;
ctx.fillRect(460,249,100,52);
///////////

door();
function door(){
	ctx.lineWidth = 10;
	ctx.lineJoin = "miter";
	ctx.miterLimit = 5;
	ctx.moveTo(480, 430);
	ctx.lineTo(505, 380);
	ctx.lineTo(530, 430);
	ctx.stroke();
}
Sun();
function Sun(){
	ctx.beginPath();
	ctx.arc(150,25,20,0,2*Math.PI);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();
}
cloud();
function cloud(){
	ctx.beginPath();
     ctx.moveTo(85, 40);
     ctx.bezierCurveTo(32, 50, 32, 75, 115, 70);
     ctx.bezierCurveTo(160, 75, 210, 60, 195, 50);
     ctx.bezierCurveTo(215, 20, 185, 15, 170, 25);
     ctx.bezierCurveTo(110, 2.5, 90, 2.5, 85, 40);
     ctx.closePath();
     ctx.fillStyle = "lightblue";
     ctx.fill();
}