export function drawSpline(
  ctx: CanvasRenderingContext2D | Path2D,
  pts: number[],
  t: number,
  closed?: boolean,
  showDetails?: boolean,
): void