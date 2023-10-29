export function drawSpline(
  ctx: CanvasRenderingContext2D | Path2D,
  pts: number[],
  t: number,
  closed?: boolean,
  showDetails?: boolean,
): void

export function getSplineUntyped(ctx: CanvasRenderingContext2D, pts: number[], t: number, closed?: boolean, showDetails?: boolean): void

export function getSplineUntypedAAA(pts: number[], t: number, closed?: boolean, showDetails?: boolean): any;
