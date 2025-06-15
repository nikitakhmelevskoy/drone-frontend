import { useEffect, useState } from "react";
import { Feature, Map as OlMap } from "ol";
import { MapBrowserEvent } from "ol";

import { type ClickData } from "./types";
import {
  isPolygonFeature,
  isPointFeature,
  isOrganizationPointFeature,
} from "../lib";

import type { PolygonFeature, PointFeature } from "./types";

export const useClick = (map: OlMap | null) => {
  const [selectedFeatureData, setSelectedFeatureData] =
    useState<ClickData | null>(null);

  useEffect(() => {
    if (!map) return;

    const handleClick = (evt: MapBrowserEvent) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => {
        if (!(f instanceof Feature)) return;

        if (
          isPolygonFeature(f) ||
          isPointFeature(f) ||
          isOrganizationPointFeature(f)
        ) {
          return f;
        }
      }) as PolygonFeature | PointFeature | undefined;

      if (!feature) {
        setSelectedFeatureData(null);
        return;
      }

      if (isPolygonFeature(feature)) {
        setSelectedFeatureData({
          type: "polygon",
          data: {
            _id: feature.get("_id"),
            points: feature.get("points"),
            organizationPoint: feature.get("organizationPoint"),
          },
        });
      } else if (isPointFeature(feature)) {
        setSelectedFeatureData({
          type: "point",
          data: {
            _id: feature.get("_id"),
            measurements: feature.get("measurements"),
            latitude: feature.get("latitude"),
            longitude: feature.get("longitude"),
            organizationPoint: feature.get("organizationPoint"),
          },
        });
      }
    };

    const handlePointerMove = (evt: MapBrowserEvent) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => {
        if (!(f instanceof Feature)) return;

        if (isPolygonFeature(f) || isPointFeature(f)) {
          return f;
        }
      });

      const target = map.getTargetElement();
      if (target) {
        target.style.cursor = feature ? "pointer" : "";
      }
    };

    map.on("click", handleClick);
    map.on("pointermove", handlePointerMove);
    return () => {
      map.un("click", handleClick);
      map.un("pointermove", handlePointerMove);
    };
  }, [map]);

  return { selectedFeatureData, clear: () => setSelectedFeatureData(null) };
};
