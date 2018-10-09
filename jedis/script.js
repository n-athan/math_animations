//setup
var canvas = document.querySelector("canvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
// ctx.globalCompositeOperation = 'overlay';

//center
const cx = width/2;
const cy = height/2;
const tau = Math.PI*2;
const E = Math.E;
const gr = 2.4;
const blue = 240;
const red = 0;

animate();

//animate
function animate() {
    var t = 0;
    var interval =  setInterval(function() {     
        ctx.clearRect(0,0,width,height);
        drawLightSaber(blue,pos2,t);
        drawTail(blue,pos2,t,60,0.05);
        drawLightSaber(red,pos1,t);
        drawTail(red,pos1,t,60,0.05);
        t += 0.1;
    },20);
}

function drawLightSaber(color, callback, t) {
    let pos = callback(t);
    ctx.beginPath();
    ctx.moveTo(pos.x,pos.y);
    ctx.lineTo(pos.x1,pos.y1);
    ctx.strokeStyle = `hsl(${color},75%,50%)`;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();

    //test points
    // ctx.beginPath();
    // ctx.arc(pos.x,pos.y,2,0,tau,false);
    // ctx.fillStyle = `${color}`;
    // ctx.fill();
}

function drawTail(color,callback,t,length,density) {
    for(var i = density; i < Math.floor(length*density); i += density) {
        let pos = callback(t-i);
        let c= i/density;
        let s = 75 - (20/length) * c;
        let l = 50 + (15/length) * c;
        let a = 1 - c/(length/2)
        var grd = ctx.createLinearGradient(pos.x,pos.y,pos.x1,pos.y1);
        grd.addColorStop(0.0,`hsla(${color},${s}%,${l}%,${a})`);
        grd.addColorStop(0.5,`hsla(${color},${s}%,${l}%,1)`);
        grd.addColorStop(1.0,`hsla(${color},${s}%,${l}%,${a})`);

        ctx.beginPath();
        ctx.moveTo(pos.x,pos.y);
        ctx.lineTo(pos.x1,pos.y1);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.closePath();
    }
}

function pos1(t) {
    let x = Math.cos(t/5)*500+cx*0.7;
    let y = Math.sin(t/E)*50+cy+150;
    let x1 = Math.cos(t/5)*100+cx*0.7+Math.sin(t/E) *500;
    let y1 = Math.sin(t/E)*100+cy;
    // let x1 = Math.cos(t/5)*200+cx/2;
    // let y1 = Math.sin(t/5) *500+cy;
    return {x:x, y:y, x1:x1, y1:y1}
}

function pos2(t) {
    let x = Math.cos(t/gr)*300+cx*1.3;
    let y = Math.sin(t/Math.PI)*100+cy+50;
    // let x = Math.cos(t/5)*200+cx*1.5;
    // let y = Math.sin(t/5) *500+cy;
    let x1 = Math.cos(t/3)*200+cx*1.3+Math.sin(t/gr) *250;
    let y1 = Math.sin(t/3) *20+cy+200;
    return {x:x, y:y, x1:x1, y1:y1}
}
