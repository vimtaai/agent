export function convertDegreesToRadians(angleInDegrees) {
  return (angleInDegrees / 180) * Math.PI;
}

export function convertRadiansToDegrees(angleInRadians) {
  return (angleInRadians / Math.PI) * 180;
}

export const Geometry = {
  convertDegreesToRadians,
  convertRadiansToDegrees,
};
