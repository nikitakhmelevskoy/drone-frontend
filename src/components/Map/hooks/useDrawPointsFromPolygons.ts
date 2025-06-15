import { useEffect } from "react";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";

import { PolygonModel } from "../../../shared/types";
import type { PointFeature, OrganizationPointFeature } from "./types";
import { animatePulse, MAIN_POINT_STYLE } from "../lib";

export const useDrawPointsFromPolygons = (
  vectorSource: VectorSource | null,
  polygons: PolygonModel[]
) => {
  useEffect(() => {
    if (!vectorSource || polygons.length === 0) return;

    polygons.forEach((polygon) => {
      polygon.points.forEach((point) => {
        const geometry = new Point([point.longitude, point.latitude]);

        const feature = new Feature({
          geometry,
          featureType: "point",
          _id: point._id,
          measurements: point.measurements,
          organizationPoint: point.organizationPoint,
          latitude: point.latitude,
          longitude: point.longitude,
        }) as PointFeature;

        vectorSource.addFeature(feature);
      });

      const orgPoint = polygon.organizationPoint;
      const orgGeometry = new Point([orgPoint.longitude, orgPoint.latitude]);

      const orgFeature = new Feature({
        geometry: orgGeometry,
        featureType: "organizationPoint",
        _id: orgPoint._id,
        name: orgPoint.name,
      }) as OrganizationPointFeature;

      orgFeature.setStyle(MAIN_POINT_STYLE);
      vectorSource.addFeature(orgFeature);

      animatePulse(orgFeature);
    });

    return () => {
      vectorSource.clear();
    };
  }, [vectorSource, polygons]);
};
