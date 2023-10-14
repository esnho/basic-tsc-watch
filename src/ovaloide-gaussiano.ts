import { noise } from "./gaussian.js";
import { Oval } from "./ovaloide-definition.js";

let oval: Oval;

export function setOvalGaussiano(o: Oval) {
  oval = o;
}

export function updateOvalGaussiano(ctx: CanvasRenderingContext2D,delta: number) {
  const rate = 1;
  oval.b1.cp1x = oval.b1.cp1x + (noise([oval.b1.x / ctx.canvas.width, oval.b1.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b1.cp1y = oval.b1.cp1y + (noise([oval.b1.cp2x / ctx.canvas.width, oval.b1.cp2y / ctx.canvas.height]) * delta * rate);
  oval.b1.cp2x = oval.b1.cp2x + (noise([oval.b1.cp1x / ctx.canvas.width, oval.b1.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b1.cp2y = oval.b1.cp2y + (noise([oval.b1.cp2x / ctx.canvas.width, oval.b1.y / ctx.canvas.height]) * delta * rate);
  oval.b1.x = oval.b1.x + (noise([oval.b1.cp1x / ctx.canvas.width, oval.b1.x / ctx.canvas.height]) * delta * rate);
  oval.b1.y = oval.b1.y + (noise([oval.b1.y / ctx.canvas.width, oval.b1.cp2y / ctx.canvas.height]) * delta * rate);

  oval.b2.cp1x = oval.b2.cp1x + (noise([oval.b2.x / ctx.canvas.width, oval.b2.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b2.cp1y = oval.b2.cp1y + (noise([oval.b2.cp2x / ctx.canvas.width, oval.b2.y / ctx.canvas.height]) * delta * rate);
  oval.b2.cp2x = oval.b2.cp2x + (noise([oval.b2.cp1x / ctx.canvas.width, oval.b2.cp1y / ctx.canvas.height]) * delta * rate);
  oval.b2.cp2y = oval.b2.cp2y + (noise([oval.b2.cp2x / ctx.canvas.width, oval.b2.cp2y / ctx.canvas.height]) * delta * rate);
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
}

export function drawAndUpdateOvaloideGaussiano(ctx: CanvasRenderingContext2D, clippath1: Path2D, delta: number) {
  updateOvalGaussiano(ctx, delta);
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