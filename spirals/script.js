var canvas = document.querySelector("canvas");
var width = canvas.width = 500;
var height = canvas.height = 500;
var ctx = canvas.getContext('2d');

//center
cx = width/2;
cy = height/2;

// fermats spiral https://en.wikipedia.org/wiki/Fermat%27s_spiral 
fermat = function(a,theta) {
    var t = Math.sqrt(theta);
    x = a * t * Math.cos(theta) + cx;
    y = a * t * Math.sin(theta) + cy;
    return {x: x, y:y};
}

//mooie in animate();
// theta += (Math.PI/1.621)*0.7;
// var a = 5;

//golden spiral in radians = 2.4

function drawPoint(x,y, hue,l) {
    ctx.beginPath();
    ctx.arc(x,y,1.5,0,Math.PI*2,false);
    ctx.fillStyle = `hsla(${hue},50%,${l}%,0.5)`;
    ctx.fill();
}

function animateSpiral(a,theta_d,stopAt, speed) {
    if (!speed) var speed = 20;
    if (!a) var a = 5;
    if (!theta_d) var theta_d = Math.PI/1.621;
    var count = 0,hue = 0, theta = 0, l = 70;
    var interval = setInterval(function() {
        x = fermat(a,theta).x;
        y = fermat(a,theta).y;
        drawPoint(x,y,hue,l);
        hue += 7; theta += theta_d; count ++; l+= 30/stopAt;
        if (count > stopAt) clearInterval(interval);
    }, speed);
    return count;
}

function drawSpiral(a,theta_d,p, l) {
    var theta = 0;
    var hue = 0;
    for (var i = 0; i <= p; i++){
        ferm = (fermat(a,theta));
        drawPoint(ferm.x,ferm.y,hue, l);
        theta += theta_d;
        hue += 7;
    }
}

function starFadeInOut(a,theta_d,size,FadeIn,FadeOut) {
    animateSpiral(a,theta_d,size,FadeIn);
    setTimeout(function() {
        var l = 100;
        var interval2 = setInterval( function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            drawSpiral(a, theta_d,size,l);
            l -= 5;
            if (l < 15) {
                ctx.clearRect(0,0,canvas.width, canvas.height);
                clearInterval(interval2);}
        },FadeOut)
    }, size*FadeIn*3)
}

starFadeInOut(3,7,100,5,50);
