import { generateGaussianNoise, noise } from "./gaussian.js";

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

const draw = (time: number, delta: number) => {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.save();
  // Create a circular clipping path
  let clippath = new Path2D();
  let clippath1 = new Path2D();
  clippath1.lineTo(ctx.canvas.width * 0.5, 0);
  ovaloide(clippath1, delta);
  clippath1.lineTo(ctx.canvas.width * 0.0, ctx.canvas.height * 0.);
  let m = new DOMMatrix();
  m = m.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
  m = m.scale(.5)
  clippath.addPath(clippath1, m);
  ctx.clip(clippath);

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

const oval = {
  b1: {
    cp1x: ctx.canvas.width * 0.5,
    cp1y: ctx.canvas.height * 0.5,
    cp2x: ctx.canvas.width * 0,
    cp2y: ctx.canvas.height * 0.5,
    x: ctx.canvas.width * 0.,
    y: ctx.canvas.height * 0.5,
  },
  b2: {
    cp1x: ctx.canvas.width * -0.,
    cp1y: ctx.canvas.height * 0.5,
    cp2x: ctx.canvas.width * -0.5,
    cp2y: ctx.canvas.height * 0.5,
    x: ctx.canvas.width * -0.5,
    y: ctx.canvas.height * 0.
  },
  b3: {
    cp1x: ctx.canvas.width * -0.5,
    cp1y: ctx.canvas.height * -0.5,
    cp2x: ctx.canvas.width * -0.,
    cp2y: ctx.canvas.height * -0.5,
    x: ctx.canvas.width * -0.,
    y: ctx.canvas.height * -0.5
  },
  b4: {
    cp1x: ctx.canvas.width * 0.5,
    cp1y: ctx.canvas.height * -0.5,
    cp2x: ctx.canvas.width * 0.5,
    cp2y: ctx.canvas.height * 0.,
    x: ctx.canvas.width * 0.5,
    y: ctx.canvas.height * 0.
  }
}

function updateOval(delta: number) {
  // noise([x / ctx.canvas.width, y / ctx.canvas.height])
  const rate = 10;
  oval.b1.cp1x = oval.b1.cp1x + (noise([oval.b1.x / ctx.canvas.width, oval.b1.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b1.cp1y = oval.b1.cp1y + (noise([oval.b1.cp2x / ctx.canvas.width, oval.b1.cp2y / ctx.canvas.height]) * delta * rate);
  oval.b1.cp2x = oval.b1.cp2x + (noise([oval.b1.cp1x / ctx.canvas.width, oval.b1.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b1.cp2y = oval.b1.cp2y + (noise([oval.b1.cp2x / ctx.canvas.width, oval.b1.y / ctx.canvas.height]) * delta * rate);
  oval.b1.x = oval.b1.x + (noise([oval.b1.cp1x / ctx.canvas.width, oval.b1.x / ctx.canvas.height]) * delta * rate);
  oval.b1.y = oval.b1.y + (noise([oval.b1.y / ctx.canvas.width, oval.b1.cp2y / ctx.canvas.height]) * delta * rate);

  oval.b2.cp1x = oval.b2.cp1x + (noise([oval.b2.x / ctx.canvas.width, oval.b2.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b2.cp1y = oval.b2.cp1y + (noise([oval.b2.cp2x / ctx.canvas.width, oval.b2.cp2y / ctx.canvas.height]) * delta * rate);
  oval.b2.cp2x = oval.b2.cp2x + (noise([oval.b2.cp1x / ctx.canvas.width, oval.b2.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b2.cp2y = oval.b2.cp2y + (noise([oval.b2.cp2x / ctx.canvas.width, oval.b2.y / ctx.canvas.height]) * delta * rate);
  oval.b2.x = oval.b2.x + (noise([oval.b2.cp1x / ctx.canvas.width, oval.b2.x / ctx.canvas.height]) * delta * rate);
  oval.b2.y = oval.b2.y + (noise([oval.b2.y / ctx.canvas.width, oval.b2.cp2y / ctx.canvas.height]) * delta * rate);

  oval.b3.cp1x = oval.b3.cp1x + (noise([oval.b3.x / ctx.canvas.width, oval.b3.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b3.cp1y = oval.b3.cp1y + (noise([oval.b3.cp2x / ctx.canvas.width, oval.b3.cp2y / ctx.canvas.height]) * delta * rate);
  oval.b3.cp2x = oval.b3.cp2x + (noise([oval.b3.cp1x / ctx.canvas.width, oval.b3.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b3.cp2y = oval.b3.cp2y + (noise([oval.b3.cp2x / ctx.canvas.width, oval.b3.y / ctx.canvas.height]) * delta * rate);
  oval.b3.x = oval.b3.x + (noise([oval.b3.cp1x / ctx.canvas.width, oval.b3.x / ctx.canvas.height]) * delta * rate);
  oval.b3.y = oval.b3.y + (noise([oval.b3.y / ctx.canvas.width, oval.b3.cp2y / ctx.canvas.height]) * delta * rate);

  oval.b4.cp1x = oval.b4.cp1x + (noise([oval.b4.x / ctx.canvas.width, oval.b4.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b4.cp1y = oval.b4.cp1y + (noise([oval.b4.cp2x / ctx.canvas.width, oval.b4.cp2y / ctx.canvas.height]) * delta * rate);
  oval.b4.cp2x = oval.b4.cp2x + (noise([oval.b4.cp1x / ctx.canvas.width, oval.b4.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b4.cp2y = oval.b4.cp2y + (noise([oval.b4.cp2x / ctx.canvas.width, oval.b4.y / ctx.canvas.height]) * delta * rate);
  oval.b4.x = oval.b4.x + (noise([oval.b4.cp1x / ctx.canvas.width, oval.b4.x / ctx.canvas.height]) * delta * rate);
  oval.b4.y = oval.b4.y + (noise([oval.b4.y / ctx.canvas.width, oval.b4.cp2y / ctx.canvas.height]) * delta * rate);
  /* oval.b1.cp2x,
  oval.b1.cp2y,
  oval.b1.x,
  oval.b1.y, */
}

function ovaloide(clippath1: Path2D, delta: number) {
  updateOval(delta);
  clippath1.bezierCurveTo(
    oval.b1.cp1x,
    oval.b1.cp1y,
    oval.b1.cp2x,
    oval.b1.cp2y,
    oval.b1.x,
    oval.b1.y,
  );
  clippath1.bezierCurveTo(
    oval.b2.cp1x,
    oval.b2.cp1y,
    oval.b2.cp2x,
    oval.b2.cp2y,
    oval.b2.x,
    oval.b2.y,
  );
  clippath1.bezierCurveTo(
    oval.b3.cp1x,
    oval.b3.cp1y,
    oval.b3.cp2x,
    oval.b3.cp2y,
    oval.b3.x,
    oval.b3.y,
  );
  clippath1.bezierCurveTo(
    oval.b4.cp1x,
    oval.b4.cp1y,
    oval.b4.cp2x,
    oval.b4.cp2y,
    oval.b4.x,
    oval.b4.y,
  );
  /* clippath1.bezierCurveTo(
    ctx.canvas.width * -0., ctx.canvas.height * 0.5,
    ctx.canvas.width * -0.5, ctx.canvas.height * 0.5,
    ctx.canvas.width * -0.5, ctx.canvas.height * 0.
  ); */
  /* clippath1.bezierCurveTo(
    ctx.canvas.width * -0.5, ctx.canvas.height * -0.5,
    ctx.canvas.width * -0., ctx.canvas.height * -0.5,
    ctx.canvas.width * -0., ctx.canvas.height * -0.5
  ); */
  /* clippath1.bezierCurveTo(
    ctx.canvas.width * 0.5, ctx.canvas.height * -0.5,
    ctx.canvas.width * 0.5, ctx.canvas.height * 0.,
    ctx.canvas.width * 0.5, ctx.canvas.height * 0.
  ); */
}

