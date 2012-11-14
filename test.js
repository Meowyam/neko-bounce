function heart() {

    var canvas=document.getElementById("circlecanvas");
    var ctx=canvas.getContext("2d");

	var x=150;
	var y=200;
	var r=50;

        ctx.beginPath();

	ctx.arc(x, y, r, 0.75*Math.PI, -0.25*Math.PI, false);
	ctx.arc(x+(2*(r*Math.cos(0.25*Math.PI))), y, r, 1.25*Math.PI, 0.25*Math.PI, false);
	ctx.lineTo(x+(r*(Math.sqrt(2)-1/Math.sqrt(2))),y+3*(r*(Math.sqrt(2)-1/Math.sqrt(2))));
	ctx.closePath();

        ctx.fillStyle='pink';
        ctx.fill();
}

