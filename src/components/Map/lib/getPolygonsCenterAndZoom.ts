import { type Coordinate } from "ol/coordinate";

import { type PolygonModel } from "../../../shared/types";

export const getPolygonsCenterAndZoom = (
  polygons: PolygonModel[],
  mapWidth: number,
  mapHeight: number
): { center: Coordinate; zoom: number } => {
  const allCoords = polygons.flatMap((p) => p.coordinates);

  const lons = allCoords.map(([lon]) => lon);
  const lats = allCoords.map(([, lat]) => lat);

  const minX = Math.min(...lons);
  const maxX = Math.max(...lons);
  const minY = Math.min(...lats);
  const maxY = Math.max(...lats);

  const center: Coordinate = [(minX + maxX) / 2, (minY + maxY) / 2];

  const extentWidth = maxX - minX;
  const extentHeight = maxY - minY;

  const resolutionX = extentWidth / mapWidth;
  const resolutionY = extentHeight / mapHeight;
  const resolution = Math.max(resolutionX, resolutionY);

  const initialResolution = 156_543.03392804097;
  let zoom = Math.floor(Math.log2(initialResolution / resolution));

  zoom = Math.min(Math.max(zoom, 1), 17);

  return { center, zoom };
};
