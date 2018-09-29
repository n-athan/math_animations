var canvas = document.querySelector("canvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//center
cx = width/2;
cy = height/2;

var m = 200; //module, number of points on circle
r = Math.min(width, height)/2; // radius of circle, fits in initial window.
var t = 0;
var pauze_t = 0;
var interval;
var pauzed = false;
var delta_t = 0.05;
var times = document.getElementById("times");
var in_m = document.getElementById("input m");
var in_t = document.getElementById("delta t");

start();
setDefault();

window.addEventListener("keypress", function(event) {
    if (event.which === 32 || event.which === 13) {
        if (!pauzed) {stop();
        } else cont(); };
    })

window.addEventListener("touchstart", function() {
    if (!pauzed) {stop();
    } else cont();
    },false)

    

function start() {
        points = getPoints();
        interval = setInterval(function() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawPoints();    
        drawTimesTable(t);
        if (t > 1000) clearInterval(interval); 
        t += delta_t;    
        times.value = Number(t).toFixed(2);
    }, 125);
}

function setDefault() {
    in_m.value = 200;
    in_t.value = 0.05;
    times.value = 0;
}

//controls
function stop() {
    pauze_t = t;
    clearInterval(interval);
    pauzed = true;    
    m = Number(in_m.value);
    delta_t = Number(in_t.value);
}

function cont() {
    if (pauzed) {
        t = pauze_t;
        pauzed = false;
        m = Number(in_m.value);
        delta_t = Number(in_t.value);
        if (times.value != Number(t).toFixed(2)) {
            t = Number(times.value);
        };
        start();
    };
}

function moveFrames(dir) {
    stop();
    t += delta_t*dir;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPoints();    
    drawTimesTable(t);
    times.value = Number(t).toFixed(2);
}

function getPoints() {
    var points = [];
    for(var f = 0; f <= 2*Math.PI; f += (2*Math.PI)/m) {
        var px = cx + Math.cos(f)*r;
        var py = cy + Math.sin(f)*r;
        var p = {
            x: px,
            y: py,
        };
        points.push(p);
    };
    return points;
}

function drawPoints() {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI, true); 
        ctx.fillStyle = "hsla(21, 9%, 92%,0.5)";
        ctx.fill(); 
    };   
}

function drawTimesTable(t) {    
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var toP = points[(Math.floor(i * t) % m)]; //point with number/index 
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${t*6},50%,70%,0.5)`;
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(toP.x,toP.y);
        ctx.lineWidth = 2;
        ctx.stroke();
    };
}

