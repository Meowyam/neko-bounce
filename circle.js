var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


function randomcolour() {
    var rgb = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
        var colour = "rgba(" + rgb.join(",") + ",0.4)";
    return colour;
}

function circle() {

    var canvas=document.getElementById("circleCanvas");
    var ctx=canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var circlearray = new Array();

    function Circleconstructor(x,y,r,colour) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.colour = colour;
        this.increment = Math.floor((Math.random()*5)+1);
    }

    Circleconstructor.prototype.update = function() {
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
        var circle = new Circleconstructor(x,y,r,colour);
        circlearray.push(circle);
        requestAnimationFrame(draw);
        requestAnimationFrame(createCircles);
    }

    function deleteCircles() {
       var h = (Math.sqrt(canvasWidth*canvasWidth + canvasHeight*canvasHeight))/2;
       for (var i=0; i < circlearray.length;) {
           if (circlearray[i].r >= h) {
               circlearray.splice(i,1);
           }
           else ++i;
       }
    }

    createCircles()

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var i=0; i < circlearray.length; i++) {
            var circle = circlearray[i];
            circle.update();
        }
        deleteCircles();
    }

}

function ball() {

    var canvas=document.getElementById("ballCanvas");
    var ctx=canvas.getContext("2d");

    var ballarray = new Array();
   
    function Ballconstructor(x,y,r,colour) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.colour = colour;
        this.dx = Math.floor((Math.random()*10)+1);
        this.dy = Math.floor((Math.random()*10)+1);
        this.dr = Math.floor((Math.random()*5)+1);
    }


    Ballconstructor.prototype.update = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI, true);
        ctx.lineTo(this.x+this.r, this.y+(2*this.r));
        ctx.lineTo(this.x+(2.5*this.r), this.y);
        ctx.arc((this.x+1.5*this.r), this.y, this.r, 0, Math.PI, true);
        ctx.fillStyle=this.colour;
        ctx.fill();
        this.x += this.dx;
        this.y += this.dy;
        this.r += this.dr;
    }

    function createBalls() {
        var x = 0;
        var y = 0;
        var r = 5;
        var colour = randomcolour();
        var ball = new Ballconstructor(x,y,r,colour);
        ballarray.push(ball);
        requestAnimationFrame(draw);
        requestAnimationFrame(createBalls);
    }

    createBalls();

    function deleteBalls() {
       for (var i=0; i < ballarray.length;) {
           if (ballarray[i].x >= 500) {
               ballarray.splice(i,1);
           }
           else if (ballarray[i].y >= 500) {
               ballarray.splice(i,1);
           }
           else if (ballarray[i].r >= Math.sqrt(250*250)) {
               ballarray.splice(i,1);
           }
           else ++i;
       }
    }

    function draw() {
        ctx.clearRect(0, 0, 500, 500);
        for (var i=0; i < ballarray.length; i++) {
            var ball = ballarray[i];
            ball.update();
        }
        deleteBalls();
    }

}

function bubble() {

    var canvas=document.getElementById("bubbleCanvas");
    var ctx=canvas.getContext("2d");

    var bubblearray = new Array();
   
    function Bubbleconstructor(x,y,r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = Math.floor((Math.random()*10)+1);
        this.dy = Math.floor((Math.random()*10)+1);
        this.dr = Math.floor((Math.random()*20)+1);
    }


    Bubbleconstructor.prototype.update = function() {
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
        var bubble = new Bubbleconstructor(x,y,r);
         if (bubblearray.length >= 100) {
            bubblearray.splice(0,1);
            bubblearray.push(bubble);
        }
        else {
           bubblearray.push(bubble);
        }
        requestAnimationFrame(draw);
        requestAnimationFrame(createBubble);
    }

    createBubble();

    function deleteBubble() {
       for (var i=0; i < bubblearray.length;) {
         if (bubblearray[i].r >= 50) {
               bubblearray.splice(i,1);
           }
           else ++i;
       }
    }

    function draw() {
        ctx.clearRect(0, 0, 500, 500);
        for (var i=0; i < bubblearray.length; i++) {
            var bubble = bubblearray[i];
            bubble.update();
        }
        deleteBubble();
        }

}
