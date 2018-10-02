var canvas = document.querySelector("canvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//center
cx = width/2;
cy = height/2;

var m = 200; //module, number of points on circle
r = Math.min(width, height)/2; // radius of circle, fits in initial window.
var t = 1;
var pauze_t = 0;
var interval;
// iv = 150;
var pauzed = false;
var delta_t = 1;
var times = document.getElementById("times");
var in_m = document.getElementById("input m");
var in_t = document.getElementById("delta t");
r2 = Math.max(width, height)*1.5; //outercircle

start(20);
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

    

function start(iv) {
    bigPoints = getPoints(r2);
    points = getPoints(r);
    interval = setInterval(function() {
        times.value = Number(t).toFixed(2);
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // drawPoints();    
        drawTimesTable(t,iv);
        if (t > 100) clearInterval(interval); 
        t += delta_t;
    }, iv*(m*1.5));
}

function setDefault() {
    in_m.value = 200;
    in_t.value = 1;
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
        start(20);
    };
}

function moveFrames(dir) {
    stop();
    t += delta_t*dir;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //drawPoints();    
    drawTimesTable(t);
    times.value = Number(t).toFixed(2);
}

function getPoints(r) {
    var points = [];
    for(var f = 0; f <= 2*Math.PI; f += (2*Math.PI)/m) {
        var px = cx + Math.cos(f)*r;
        var py = cy + Math.sin(f)*r;
        var p = {
            x: px,
            y: py,
            // toPx: px,
            // toPy: py,
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

function drawTimesTable(t,iv) {    
    var i = 0;
    var intervalLines = setInterval(function() {
        var p = points[i];
        var bigP = bigPoints[i];
        console.log(i);
        // //clear old line
        // ctx.globalCompositeOperation = "destination-out";
        // drawLine(p, p.toPx, p.toPy,2.2,1);

        //new line coordinates
        var toI = (Math.floor(i * t) % m);
        var toP = points[toI]; //point with number/index 
        var toBigP = bigPoints[toI];
        // p.toPx = toP.x;
        // p.toPy = toP.y;

        //draw new line
        ctx.globalCompositeOperation = "source-over";
        drawLines(p, toP, bigP, toBigP,i);
        i ++;
        if (i > m-1) clearInterval(intervalLines);
    }, iv);
}

function drawLines(p, toP, bigP, toBigP,i) {
    drawLine(bigP.x,bigP.y,p.x,p.y,2,i,0.5)
    drawLine(p.x,p.y,toP.x, toP.y,2,i,0.5);
    drawLine(toP.x,toP.y,toBigP.x, toBigP.y,2,i,0.5);
}

function drawLine(pX,pY, toX, toY,lw,i,a) {
    ctx.beginPath()
    ctx.strokeStyle = `hsla(${i*6},50%,70%,${a})`;
    ctx.moveTo(pX,pY);
    ctx.lineTo(toX,toY);
    ctx.lineWidth = lw;
    ctx.stroke();
}

