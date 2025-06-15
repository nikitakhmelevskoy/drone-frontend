import { fromLonLat } from "ol/proj";

import { WEB_MERCATOR_PROJECTION } from "./mapConstants";
import { type Coordinate } from "ol/coordinate";

/**
 * Преобразует массив координат из WGS84 (EPSG:4326) в Web Mercator (EPSG:3857)
 * @param coords Массив координат в формате [долгота, широта] [longitude, latitude]
 * @returns Массив координат в формате [x, y] Web Mercator
 */
export const convertToWebMercator = (
  coords: [number, number][]
): Coordinate[] => {
  return coords.map(([lon, lat]) =>
    fromLonLat([lon, lat], WEB_MERCATOR_PROJECTION)
  );
};
