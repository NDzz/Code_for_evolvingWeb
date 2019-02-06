var canvas;
var ctx;
var w = window.innerWidth;
var h = 700;
var allData = [];
var mouse = {"x": 0, "y":0};
var onOff = 1;
var off = 1
////////////////////////////////////////////////////
setUpCanvas();

onmousemove = function(){
// console.log(event.clientX, event.clientY);
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

document.onkeydown = function(){
	if(event.which == 83){onOff *= -1};
	if(event.which == 76){off *= -1};
	console.log(event.which)
	console.log(off)
};

createData(900);
animationLoop();

////////////////////////////////////////////////////
function animationLoop(){
	///code to loop over
	clear();
	AllData();
	requestAnimationFrame(animationLoop);

}
function AllData(){
	for(var i = 0; i < allData.length;i++){
		
	if(onOff == 1){
			ctx.stroke();
		}
			Square(allData[i]);

		move(allData[i]);
		bound(allData[i]);
			
		}
	}	

function bound(o){/////rebound function
	if(o.x + (o.r) > w||o.x < 0){
		o.dx *= -1
	};
	if(o.y + o.r > h||o.y < 0){
		o.dy *= -1
	};
}


function move(o){
	o.x += o.dx;
	o.y += o.dy

//mouse's radius to colour in the squares
if(off == 1){
	if (mouse.x - (o.x+o.r)     < 80 && mouse.x -(o.x+o.r)      > -80
	&&  mouse.y - (o.y+o.r)-150 < 80 && mouse.y - (o.y+o.r)-150 > -80)
	{ctx.fill();}
}
}

function createData(num){
	for(var i = 0; i<num; i++){
		allData.push({
			"x":  rand(w-100)+ 25,
			"y":  rand(h-100)+ 25,
			"dx": (Math.random(rand())- .5)*1,
			"dy": (Math.random(rand())- .5)*1,
			"r":  rand(50) + 10,
			"c":  rand(360),
			"a":  rand(1),
		})
	}
}

function Square(o){
	ctx.beginPath();
	ctx.rect(o.x, o.y, o.r, o.r)
	ctx.strokeStyle = "hsla("+o.c+", 100%, 0%,"+o.a+")";
	ctx.lineWidth   = "2"
	ctx.fillStyle   = "hsla("+o.c+", 100%, 50%,"+o.a+")";
}

function randi(num){
	var result = Math.floor(Math.random()* num)
	 return result 
}

function rand(num){
	 var result = Math.random()* num;
	 return result 
}

function clear(){
ctx.clearRect(0,0,w,h);
}

function setUpCanvas (){
	canvas = document.querySelector("#canvas");
	canvas.width = w; 
	canvas.height = h;
	ctx = canvas. getContext("2d");
}
