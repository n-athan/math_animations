var width = window.innerWidth;
var height = window.innerHeight;

const cx = width / 2;
const cy = height / 2;
const E = 1.612;
const gr = 2.4;
var t = 0;
var xoff = 0;
var xoff1 = 0;
var breath = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);	
}

function draw() {
	background(0);
	drawLightSaber(240, pos2, t);
	drawTail(240, pos2, t, 60, 0.05);
	drawLightSaber(0, pos1, t);
	drawTail(0, pos1, t, 60, 0.05);
    t += 0.1;
    xoff += 0.01;
    xoff1 += 0.05;
    breath += 0.1;
}

function drawLightSaber(color1, callback, t) {
	let pos = callback(t);
	line(pos.x, pos.y, pos.x1, pos.y1);
	c = color(`hsba(${color1},75%,50%,1)`);
	strokeWeight(10);
	strokeCap(ROUND);
	stroke(c);
	noFill();
}

function drawTail(color1, callback, t, length, density) {
    let total = Math.floor(length * density);
	for (var i = density; i < total; i += density) {
		let pos = callback(t - i);
		let c = i / density;
        let a = map(c,0,length,0.5,0); 
        line(pos.x, pos.y, pos.x1, pos.y1);
        c = color(`hsba(${color1},75%,50%,${a})`);
        strokeWeight(10);
        strokeCap(ROUND);
        stroke(c);
        noFill();
	}
}

function pos1(t) {
    //first draft
	// let x = cos(t / 5) * 500 + cx * 0.7;
	// let y = sin(t / E) * 50 + cy + 150;
	// let x1 = cos(t / 5) * 100 + cx * 0.7 + sin(t / E) * 500;
    // let y1 = sin(t / E) * 100 + cy;

    //standing still
    let x = noise(100+xoff)*30 + cx * 0.7;
	let y = noise(xoff1)*50 + sin(breath)*10 + cy + 50;
	let x1 = x;
    let y1 = y + 250;
    

	return {x: x,y: y,x1: x1,y1: y1}
}

function pos2(t) {
    //first draft
	// let x = cos(t / gr) * 300 + cx * 1.3;
	// let y = sin(t / PI) * 100 + cy + 50;
	// let x1 = cos(t / 3) * 200 + cx * 1.3 + sin(t / gr) * 250;
    // let y1 = sin(t / 3) * 20 + cy + 200;

    //standing still
    // let x = noise(700+xoff)*-20 +cx * 1.3;
	// let y = noise(40 + xoff1)*30 + sin(PI+breath)*10 + cy - 50;
	// let x1 = x;
    // let y1 = y + 250;

	let x = noise(700+xoff)*-20 + cx * 1.3;
	let y = noise(40 + xoff1)*30 + sin(PI+breath)*10 + cy;
	let x1 = x + Math.sin(t) * Math.cos(t)*100
	let y1 = y - Math.sin(t/Math.PI)*250;
    

	return {x: x,y: y,x1: x1,y1: y1}
}