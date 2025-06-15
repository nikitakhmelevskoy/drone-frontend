import { useEffect } from "react";
import { Polygon } from "ol/geom";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";

import { type PolygonModel } from "../../../shared/types";
import { type PolygonFeature } from "./types";

export const useDrawPolygons = (
  vectorSource: VectorSource | null,
  polygons: PolygonModel[]
) => {
  useEffect(() => {
    if (!vectorSource || !polygons.length) return;

    vectorSource.clear();

    polygons.forEach((polygon) => {
      if (!(polygon.coordinates && polygon.coordinates.length >= 3)) {
        return;
      }
      // Замыкаем полигон (первая и последняя точка должны совпадать)
      const closedCoords = [...polygon.coordinates];
      if (
        closedCoords[0][0] !== closedCoords[closedCoords.length - 1][0] ||
        closedCoords[0][1] !== closedCoords[closedCoords.length - 1][1]
      ) {
        closedCoords.push(closedCoords[0].slice());
      }

      const geometry = new Polygon([closedCoords]);

      const feature = new Feature({
        geometry,
        featureType: "polygon",
        _id: polygon._id,
        name: polygon.organizationPoint.name,
        points: polygon.points,
        organizationPoint: polygon.organizationPoint,
      }) as PolygonFeature;

      vectorSource.addFeature(feature);
    });

    return () => {
      vectorSource.clear();
    };
  }, [vectorSource, polygons]);
};
