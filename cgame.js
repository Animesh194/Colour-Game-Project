var mode = "hard";
var colors = [];
var targetColour;

var squares = document.querySelectorAll(".square");
var message = document.getElementById("msg");
var h1 = document.querySelector("h1");
var colorMsg = document.querySelector(".colour");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");
var reset = document.getElementById("reset");

allNew(mode);
addBtnListeners();
addSquareListener();

function addBtnListeners(){
	reset.addEventListener("click",function(){
		allNew(mode);
	})

	easyBtn.addEventListener("click",function(){
		hardBtn.classList.remove("clicked");
		easyBtn.classList.add("clicked");
		if(mode === "hard"){
			mode = "easy";
			allNew(mode);
		}
	})

	hardBtn.addEventListener("click",function(){
		easyBtn.classList.remove("clicked");
		hardBtn.classList.add("clicked");
		if(mode === "easy"){
			mode = "hard";
			allNew(mode);
		}
	})
}

function addSquareListener(){
	for(var i = 0;i < squares.length;i++){
		squares[i].addEventListener("click",function(){
			var pickedColour = this.style.backgroundColor;
			if(pickedColour === targetColour){
				msg.textContent = "Correct!";
				for(var i = 0;i < squares.length;i++){
					squares[i].style.backgroundColor = pickedColour;
				}
				h1.style.backgroundColor = pickedColour;
				reset.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				msg.textContent = "Try Again";
			}
		})
	}
}

function generateColour(num){
	for(var i = 0;i < num;i++){
		colors.push(getRandomColour());
	}
}

function colourSquare(){
	for(var i = 0;i < squares.length;i++){
		if(colors[i]){
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";   //if not given block...then once it is set to none..it will never appear again;
		}
		else
			squares[i].style.display = "none";   //though the squares are there but they are not displayed...like none class in bootstrap
	}
}

function getRandom(num){
	var x = Math.floor(Math.random()*num);
	return x;
}

function getRandomColour(){
	var r = getRandom(256);
	var g = getRandom(256);
	var b = getRandom(256);
	var colour = "rgb(" + r + ", " + g + ", " + b + ")";
	console.log(colour);
	return colour;
}

function allNew(mode){
	colors.length = 0;    //sets the length of the colors array = 0; means clear the total array
	if(mode === "easy"){
		generateColour(3);
		targetColour = colors[getRandom(3)];
	}
	else if(mode === "hard"){
		generateColour(6);
		targetColour = colors[getRandom(6)];
	}
	colourSquare();
	colorMsg.textContent = targetColour + " ";
	h1.style.background = "#0d7bbc";
	reset.textContent = "New Colours"
	msg.textContent = "";
}