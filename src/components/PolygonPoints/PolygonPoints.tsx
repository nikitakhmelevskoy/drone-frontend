import { FC } from "react";
import { Paper, Stack, Typography } from "@mui/material";

import type { MeasurementPointModel, PointModel } from "../../shared/types";
import { PointStatisticCard } from "../../shared/ui";

interface PolygonPointsProps {
  points: PointModel[];
}

const average = (
  measurements: MeasurementPointModel[],
  key: keyof MeasurementPointModel
) =>
  measurements.length
    ? (
        measurements.reduce((sum, m) => sum + (m[key] as number), 0) /
        measurements.length
      ).toFixed(1)
    : "—";

export const PolygonPoints: FC<PolygonPointsProps> = ({ points }) => {
  return (
    <Paper
      sx={{
        margin: "0",
        p: 3,
        pt: 1,
        backgroundColor: "rgba(255, 255, 255, 0.02)",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontSize: "20px", color: "var(--primary-color)", mb: "15px" }}
      >
        Точки полигона
      </Typography>

      <Stack
        sx={{
          flexDirection: "row",
          justifyItems: "flex-start",
          flexWrap: "wrap",
          gap: "20px",
        }}
        spacing={2}
      >
        {points.map((point, index) => {
          const measurements = point.measurements;
          return (
            <PointStatisticCard
              key={index}
              pointId={point._id}
              latitude={point.latitude}
              longitude={point.longitude}
              temperature={average(measurements, "temperature")}
              co2_level={average(measurements, "co2_level")}
              humidity={average(measurements, "humidity")}
              pressure={average(measurements, "pressure")}
            />
          );
        })}
      </Stack>
    </Paper>
  );
};
