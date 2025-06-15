import styles from "./styles.module.scss";

import { FC, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

import {
  useMap,
  useDrawPolygons,
  usePopup,
  useDrawPointsFromPolygons,
  useClick,
} from "../../hooks";
import { getPolygonsCenterAndZoom, MAP_TARGET_ID } from "../../lib";
import { type PolygonModel } from "../../../../shared/types";
import { PointCardInfo, PolygonCardInfo } from "../../../../shared/ui";
import { Paths } from "../../../../shared/constants";

interface MapProps {
  polygons: PolygonModel[];
}

export const Map: FC<MapProps> = ({ polygons }) => {
  const navigate = useNavigate();
  const { map, vectorLayer } = useMap();
  const popupRef = useRef<HTMLDivElement>(null);
  const { popupData } = usePopup(map, popupRef);
  const { selectedFeatureData, clear } = useClick(map);

  const [searchParams] = useSearchParams();

  const lon = parseFloat(searchParams.get("lon") ?? "");
  const lat = parseFloat(searchParams.get("lat") ?? "");

  useDrawPolygons(vectorLayer?.getSource() ?? null, polygons);
  useDrawPointsFromPolygons(vectorLayer?.getSource() ?? null, polygons);

  useEffect(() => {
    if (!map) return;

    const view = map.getView();

    if (!isNaN(lat) && !isNaN(lon)) {
      view.setCenter([lon, lat]);
    } else if (polygons.length > 0) {
      const mapSize = map.getSize();
      if (!mapSize) return;

      const [width, height] = mapSize;

      const { center, zoom } = getPolygonsCenterAndZoom(
        polygons,
        width,
        height
      );

      view.setCenter(center);
      view.setZoom(zoom);
    }
  }, [lat, lon, map, polygons]);

  const onClickPointMoreStat = () => {
    if (!selectedFeatureData) return;
    const entityId = selectedFeatureData.data._id;
    navigate({
      pathname: Paths.statistics,
      search: `entityType=point&entityId=${entityId}`,
    });
  };

  const onClickPolygonMoreStat = () => {
    if (!selectedFeatureData) return;
    const entityId = selectedFeatureData.data._id;
    navigate({
      pathname: Paths.statistics,
      search: `entityType=polygon&entityId=${entityId}`,
    });
  };

  return (
    <div id={MAP_TARGET_ID} className={styles.map}>
      <div ref={popupRef} className={styles.popup}>
        {popupData && (
          <>
            {popupData.type === "polygon" && (
              <div>
                <strong>Полигон измерений</strong>
                <div>
                  Организация:{" "}
                  <strong>{popupData.data.organizationPoint.name}</strong>
                </div>
                <div>Точек: {popupData.data.points.length}</div>
              </div>
            )}
            {popupData.type === "point" && (
              <div>
                <strong>Точка измерения</strong>
                <div>Последние измерения:</div>
                <div>
                  Температура: {popupData.data.measurements.at(-1).temperature}{" "}
                  °C
                </div>
                <div>
                  CO₂: {popupData.data.measurements.at(-1).co2_level} ppm
                </div>
              </div>
            )}
            {popupData.type === "organizationPoint" && (
              <div>
                <strong>{popupData.data.name}</strong>
              </div>
            )}
          </>
        )}
      </div>
      {selectedFeatureData?.type === "point" && (
        <PointCardInfo
          point={selectedFeatureData.data}
          onClickMoreStat={onClickPointMoreStat}
          onClose={clear}
        />
      )}

      {selectedFeatureData?.type === "polygon" && (
        <PolygonCardInfo
          polygon={selectedFeatureData.data}
          onClickMoreStat={onClickPolygonMoreStat}
          onClose={clear}
        />
      )}
    </div>
  );
};
