const epsilon = 0.01;
const tau = 2 * Math.PI;

let z0: number, z1: number, generate: boolean;
export function generateGaussianNoise(mu: number, sigma: number) {

  generate = !generate;

  if (!generate) {
    return z1 * sigma + mu;
  }

  let u1, u2;
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 <= epsilon);

  z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(tau * u2);
  z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(tau * u2);
  return z0 * sigma + mu;
}

const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;

function fract(f: number) {
  return f % 1;
}

const dot = (a: number[], b: number[]): number => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

function multVec(st: [number, number], mul: [number, number?]): [number, number] {
  const m = mul[1] !== undefined ? mul[1] : mul[0];
  return [
    st[0] * mul[0],
    st[1] * m
  ]
}

function subVec(st: [number, number?], mul: [number, number?]): [number, number] {
  return [
    st[0] - mul[0],
    st[1] !== undefined ? st[1] : st[0] - mul[1] !== undefined ? mul[1] : mul[0]
  ]
}

// https://thebookofshaders.com/11/

function random (st: [number, number]): number {
  const dott = dot(st, [12.9898,78.233]);
  const sined = Math.sin(dott) * 43758.5453123;
  return fract(sined);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
export function noise(st: [number, number]): number {
  const i = st.map(Math.floor) as [number, number];
  const f = st.map(fract) as [number, number];

  // Four corners in 2D of a tile
  const a = random(i);
  const b = random([i[0] + 1.0, i[1] + 0.0]);
  const c = random([i[0] + 0.0, i[1] + 1.0]);
  const d = random([i[0] + 1.0, i[1] + 1.0]);

  // Smooth Interpolation

  // Cubic Hermine Curve.  Same as SmoothStep()
  // const u = f*f*(3.0-2.0*f);
  const fpow = multVec(f, f);
  const fdouble = multVec(f, [2.0]);
  const threeminusdouble = subVec([3.0], fdouble);
  const u = multVec(fpow, threeminusdouble);
  // u = smoothstep(0.,1.,f);

  // Mix 4 coorners percentages
  return lerp(a, b, u[0]) +
          (c - a)* u[1] * (1.0 - u[0]) +
          (d - b) * u[0] * u[1];
}