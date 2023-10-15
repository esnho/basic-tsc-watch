import { generateGaussianNoise, noise } from "./gaussian.js";
import { createOval } from "./ovaloide-definition.js";
import { drawAndUpdateOvalNoise, setupPoints } from "./ovaloide-noise.js";

// import { drawSpline } from "./spline-tools.js";

const debug = false;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const rectSize = 10;
const rectPadding = 5;

const fpsInterval = 1000 / 60; // millis / fps
let prevTime = 0;
let then = Date.now();
let startTime = then;
let frameCount = 0;

setupPoints(ctx);

const draw = (time: number, delta: number) => {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.save();
  // Create a circular clipping path
  let cropPath = new Path2D();
  let cropFigure = new Path2D();
  cropFigure.lineTo(ctx.canvas.width * 0.5, 0);
  drawAndUpdateOvalNoise(ctx, cropFigure, delta);
  cropFigure.lineTo(ctx.canvas.width * 0.0, ctx.canvas.height * 0.);
  let transform = new DOMMatrix();
  transform = transform.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
  transform = transform.scale(.5)
  cropPath.addPath(cropFigure, transform);
  ctx.clip(cropPath);

  ctx.fillStyle = "#00FF00";
  const startOffset = (time % ((rectPadding +  rectSize))) - rectSize;
  for (let x = startOffset; x < ctx.canvas.width; x = x + rectSize + rectPadding) {
    for (let y = startOffset; y < ctx.canvas.height; y = y + rectSize + rectPadding) {
      ctx.fillRect(x, y, rectSize, rectSize);
    }
  }

  ctx.restore();

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(0, generateGaussianNoise(0, time * 0.1), 10, 10);


  ctx.fillStyle = "#FF0000";
  ctx.strokeStyle = ctx.fillStyle;


  /* if (debug) {
    ctx.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
    ctx.scale(0.5, 0.5)
    let i = 60;
    for (const b in oval) {
      const boo = oval[b];
      ctx.fillStyle = "#FF0000";
      quad(ctx, boo.cp1x, boo.cp1y, 20 + i);
      ctx.fillStyle = "#FFFF00";
      quad(ctx, boo.cp2x, boo.cp2y, 20 + i);
      ctx.fillStyle = "#00FFFF";
      quad(ctx, boo.x, boo.y, 20 + i);
  
      i = i - 10
    }
    ctx.resetTransform();
  } */

  /* for (let x = 0; x < ctx.canvas.width; x++) {
    for (let y = 0; y < ctx.canvas.height; y++) {
      const n = Math.abs(noise([x / ctx.canvas.width, y / ctx.canvas.height]));
      const fstyle = `rgb(${n * 255}, ${n * 255}, ${n * 255})`;
      ctx.fillStyle = fstyle;
      ctx.fillRect(x, y, 1, 1);
    }
  } */
  
  // ctx.closePath();
}

const updateAndDraw: FrameRequestCallback = (time) => {

  let now = Date.now();
  let elapsed = now - then;

  if (elapsed < fpsInterval) {
    window.requestAnimationFrame(updateAndDraw);
    return;
  }

  then = now;

  let t = time * 0.01;
  draw(t, t - prevTime);
  prevTime = t;

  let sinceStart = now - startTime;
  let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
  console.log(currentFps)
  window.requestAnimationFrame(updateAndDraw);
}

window.requestAnimationFrame(updateAndDraw)


function quad(ctx: CanvasRenderingContext2D,x: number, y: number, size: number) {
  ctx.fillRect(x, y, size, size);
}