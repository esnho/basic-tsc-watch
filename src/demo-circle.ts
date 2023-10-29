// adapted from https://stackoverflow.com/questions/26947321/building-a-circle-with-quadratic-curves-in-canvas

import { lerp } from "./utils";

// change sideCount to the # of poly sides desired
//
const sideCount = 5;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
ctx.fillStyle = randomColor();

// save PI*2  
const PI2 = Math.PI * 2;

// functions to calc a point on circumference of circle
/* const xx = function (center: Point, a: number, r: number) { return (center.x + r * Math.cos(a)); }
const yy = function (center: Point, a: number, r: number) { return (center.y + r * Math.sin(a)); } */

function polarToCart(center: Point, a: number, r: number): Point {
  return {
    x: (center.x + r * Math.cos(a)),
    y: (center.y + r * Math.sin(a)),
  }
}

// general interpolation function
// define the regular polygon
const cx = 150;
const cy = 150;
const polyCenter = {x: 150, y: 150};
const radius = 100;

// calc qCurve controls points and put in sides[] array
const sides: Side[] = [];
for (let i = 0; i < sideCount; i++) {
  sides.push(makeSide(i, sideCount));
}

// drawing and animating stuff
let percent = 0;
let percentDirection = 0.50;

document.getElementById("toShape").onclick = () => {
  percentDirection = -0.50;
}

document.getElementById("toCircle").onclick = () => {
  percentDirection = 0.50;
}

animate();

// functions

function animate() {
  requestAnimationFrame(animate);
  drawSides(percent);
  percent += percentDirection;
  if (percent > 100) { percent = 100; }
  if (percent < 0) { percent = 0; }
}


function drawSides(pct: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (pct == 100) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, PI2);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(sides[0].x0, sides[0].y0);
    for (var i = 0; i < sideCount; i++) {
      var side = sides[i];
      var cpx = lerp(side.midX, side.cpX, pct / 100);
      var cpy = lerp(side.midY, side.cpY, pct / 100);
      ctx.quadraticCurveTo(cpx, cpy, side.x2, side.y2);
    }
    ctx.fill();
  }
}

// given a side of a regular polygon,
// calc a qCurve that approximates a circle 
function makeSide(n: number, sideCount: number): Side {

  // starting & ending angles vs centerpoint       
  const sweep = PI2 / sideCount;
  const sAngle = sweep * (n - 1);
  const eAngle = sweep * n;

  // given start & end points,
  // calc the point on circumference at middle of sweep angle
  const p0 = polarToCart(polyCenter, sAngle, radius);
  const p1 = polarToCart(polyCenter, (eAngle + sAngle) / 2, radius);
  const p2 = polarToCart(polyCenter, eAngle, radius);

  // calc the control points to pass a qCurve 
  // through the 3 points
  const midX = lerp(p0.x, p2.x, 0.50);
  const midY = lerp(p0.y, p2.y, 0.50);

  // calc middle control point            
  const cpX = 2 * p1.x - p0.x / 2 - p2.x / 2;
  const cpY = 2 * p1.y - p0.y / 2 - p2.y / 2;
  
  return ({
    x0: p0.x,
    y0: p0.y,
    x2: p2.x,
    y2: p2.y,
    midX: midX,
    midY: midY,
    cpX: cpX,
    cpY: cpY,
    color: randomColor()
  });
}

function randomColor() {
  return ('#' + Math.floor(Math.random() * 16777215).toString(16));
}

type Side = {
  x0: number;
  y0: number;
  x2: number;
  y2: number;
  midX: number;
  midY: number;
  cpX: number;
  cpY: number;
  color: string;
};

type Point = {
  x: number,
  y: number,
}