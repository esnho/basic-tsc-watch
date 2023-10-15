// r&d https://stackoverflow.com/questions/26947321/building-a-circle-with-quadratic-curves-in-canvas
// rd http://scaledinnovation.com/analytics/splines/aboutSplines.html
// https://www.instagram.com/p/CxxmsqAIqFf/?igshid=MzRlODBiNWFlZA==



const points = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 1},
  {x: 0, y: 0},
];

export function setupPoints(ctx: CanvasRenderingContext2D) {
  points.forEach((p) => {
    p.x = ctx.canvas.width * p.x;
    p.y = ctx.canvas.height * p.y;
  })
}

export function updateOvalNoise(ctx: CanvasRenderingContext2D,delta: number) {
  const rate = 1;
}

export function drawAndUpdateOvalNoise(ctx: CanvasRenderingContext2D, clippath1: Path2D, delta: number) {
  // move to the first point
  clippath1.moveTo(points[0].x, points[0].y);
  for (var i = 1; i < points.length; i++) {
    var xc = (points[i].x + points[(i + 1) % points.length].x) / 2;
    var yc = (points[i].y + points[(i + 1) % points.length].y) / 2;
    clippath1.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  clippath1.closePath();
}