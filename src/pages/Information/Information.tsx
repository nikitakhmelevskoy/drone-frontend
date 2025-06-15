import styles from "./styles.module.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Typography, Box } from "@mui/material";
import { toLonLat } from "ol/proj";

import { PaperCustom, DataGridCustom, LoaderDrone } from "../../shared/ui";
import { getAllPoints } from "../../shared/api";
import { type PointModel } from "../../shared/types";
import { generateRandomNumber } from "../../shared/lib";
import { columns, type PointRow } from "./constants";

const converter = (points: PointModel[]): PointRow[] => {
  const ans: PointRow[] = [];

  points.forEach((point) => {
    const [longitude, latitude] = toLonLat([point.longitude, point.latitude]);

    let newPoint = {
      id: generateRandomNumber(),
      organization: point.organizationPoint.name,
      longitude,
      latitude,
    };

    point.measurements.forEach((measurement) => {
      const newPointMeasurement = {
        temperature: measurement.temperature,
        co2: measurement.co2_level,
        humidity: measurement.humidity,
        pressure: measurement.pressure,
        measurementTime: measurement.createdAt,
      };
      newPoint = { ...newPoint, ...newPointMeasurement };
    });

    ans.push(newPoint as PointRow);
  });

  return ans;
};

export const Information = () => {
  const [points, setPoints] = useState<PointRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    getAllPoints()
      .then((res) => {
        const rows = converter(res.data);
        setPoints(rows);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleRowClick = (lon: number, lat: number) => {
    navigate(`/map?lon=${lon}&lat=${lat}`);
  };

  return (
    <PaperCustom sx={{ marginTop: "50px" }}>
      <Typography className={styles.title} variant="h2">
        Мониторинговая таблица
      </Typography>

      {!isLoading ? (
        <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
          <DataGridCustom
            rows={points}
            columns={columns}
            onRowClick={(params) => {
              const { longitude, latitude } = params.row;
              handleRowClick(longitude, latitude);
            }}
          />
        </Box>
      ) : (
        <LoaderDrone text="Загрузка данных для таблицы..." />
      )}
    </PaperCustom>
  );
};
