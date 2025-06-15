import { toLonLat } from "ol/proj";

export const formatCoordinates = (
  mercatorCoords: [number, number],
  fractionDigits = 6
) => {
  const [lon, lat] = toLonLat(mercatorCoords);
  return `${lat.toFixed(fractionDigits)}, ${lon.toFixed(fractionDigits)}`;
};
