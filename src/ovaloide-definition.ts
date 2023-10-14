export type Oval = {[index: string]: {cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number}};


export const createOval: (ctx: CanvasRenderingContext2D) => Oval = (ctx) =>{
  return {
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
}