var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var stopAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

var circletoggle = false;
var hearttoggle = false;
var bubbletoggle = false;

function randomcolour() {
    var rgb = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
        var colour = "rgba(" + rgb.join(",") + ",0.4)";
    return colour;
}

function stop() {
    if (circletoggle == true) {
        stopAnimationFrame(moveCircle);
        circletoggle = false;
    }
    if (hearttoggle == true) {
	stopAnimationFrame(moveHeart);
	hearttoggle = false;
    }
    if (bubbletoggle == true) {
	stopAnimationFrame(moveBubbles);
	bubbletoggle = false;
    }
}


function startstopcircle() {


   if (circletoggle == false) {
	startcircle();
   }
   else {
	stop();
   }
}

function startstopheart() {

   if (hearttoggle == false) {
	startheart();
   }
   else {
	stop();
   }
}

function startstopbubble() {

   if (bubbletoggle == false) {
	startbubble();
   }
   else {
	stop();
   }
}

function startcircle() {

    circletoggle = !circletoggle;

    var canvas=document.getElementById("circlecanvas");
    var ctx=canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var circles = new Array();

    function Circle(x,y,r,colour) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.colour = colour;
        this.increment = Math.floor((Math.random()*5)+1);
    }

    Circle.prototype.update = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.fillStyle=this.colour;
        ctx.fill();
        this.r += this.increment;
    }

    function createCircles() {
        var x = canvasWidth/2;
        var y = canvasHeight/2;
        var r = 5;
        var colour = randomcolour();
        var circle = new Circle(x,y,r,colour);
        circles.push(circle);
        draw();
        moveCircle = requestAnimationFrame(createCircles);
    }

    function deleteCircles() {
       var h = (Math.sqrt(canvasWidth*canvasWidth + canvasHeight*canvasHeight))/2;
       for (var i=0; i < circles.length;) {
           if (circles[i].r >= h) {
               circles.splice(i,1);
           }
           else ++i;
       }
    }

    createCircles()

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var i=0; i < circles.length; i++) {
            var circle = circles[i];
            circle.update();
        }
        deleteCircles();
    }

}

function startheart() {

    hearttoggle = !hearttoggle

    var canvas=document.getElementById("circlecanvas");
    var ctx=canvas.getContext("2d");

    var hearts = new Array();
   
    function Heart(x,y,r,colour) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.colour = colour;
        this.dx = Math.floor((Math.random()*10)+1);
        this.dy = Math.floor((Math.random()*10)+1);
        this.dr = Math.floor((Math.random()*5)+1);
    }


    Heart.prototype.update = function() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0.75*Math.PI, -0.25*Math.PI, false);
	ctx.arc(this.x+(2*(this.r*Math.cos(0.25*Math.PI))), this.y, this.r, 1.25*Math.PI, 0.25*Math.PI, false);
	ctx.lineTo(this.x+(this.r*(Math.sqrt(2)-1/Math.sqrt(2))), this.y+3*(this.r*(Math.sqrt(2)-1/Math.sqrt(2))));
	ctx.closePath();
        ctx.fillStyle=this.colour;
        ctx.fill();
        this.x += this.dx;
        this.y += this.dy;
        this.r += this.dr;
    }

    function createHearts() {
        var x = 0;
        var y = 0;
        var r = 5;
        var colour = randomcolour();
        var heart = new Heart(x,y,r,colour);
        hearts.push(heart);
        draw();
        moveHeart = requestAnimationFrame(createHearts);
    }

    createHearts();

    function deleteHearts() {
       for (var i=0; i < hearts.length;) {
           if (hearts[i].x >= 500) {
               hearts.splice(i,1);
           }
           else if (hearts[i].y >= 500) {
               hearts.splice(i,1);
           }
           else if (hearts[i].r >= Math.sqrt(250*250)) {
               hearts.splice(i,1);
           }
           else ++i;
       }
    }

    function draw() {
        ctx.clearRect(0, 0, 500, 500);
        for (var i=0; i < hearts.length; i++) {
            var heart = hearts[i];
            heart.update();
        }
        deleteHearts();
    }

}

function startbubble() {

   bubbletoggle = !bubbletoggle

    var canvas=document.getElementById("circlecanvas");
    var ctx=canvas.getContext("2d");

    var bubbles = new Array();
   
    function Bubble(x,y,r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = Math.floor((Math.random()*10)+1);
        this.dy = Math.floor((Math.random()*10)+1);
        this.dr = Math.floor((Math.random()*20)+1);
    }


    Bubble.prototype.update = function() {
       ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.fillStyle="rgba(101,109,212,0.4)";
        ctx.fill();
        ctx.closePath();
        if (this.x + this.dx > 500 || this.x + this.dx < 0) {
            this.dx = -this.dx;
            this.r += this.dr;}
        if (this.y + this.dy > 500 || this.y + this.dy < 0) {
            this.dy = -this.dy;
            this.r += this.dr;}
        this.x += this.dx;
        this.y += this.dy;
    }

    function createBubble() {
        var x = 0;
        var y = 0;
        var r = 5;
        var bubble = new Bubble(x,y,r);
         if (bubbles.length >= 100) {
            bubbles.splice(0,1);
            bubbles.push(bubble);
        }
        else {
           bubbles.push(bubble);
        }
        draw();
        moveBubbles = requestAnimationFrame(createBubble);
    }

    createBubble();

    function deleteBubble() {
       for (var i=0; i < bubbles.length;) {
         if (bubbles[i].r >= 50) {
               bubbles.splice(i,1);
           }
           else ++i;
       }
    }

    function draw() {
        ctx.clearRect(0, 0, 500, 500);
        for (var i=0; i < bubbles.length; i++) {
            var bubble = bubbles[i];
            bubble.update();
        }
        deleteBubble();
        }

}
