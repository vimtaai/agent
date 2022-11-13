export function convertDegreesToRadians(valueInDegrees) {
  return (valueInDegrees / 180) * Math.PI;
}

export const Geometry = {
  convertDegreesToRadians,
};

export default Geometry;
