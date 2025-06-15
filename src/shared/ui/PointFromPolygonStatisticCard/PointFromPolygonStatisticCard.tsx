import { FC } from "react";
import { useNavigate } from "react-router";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

import { Paths } from "../../constants";
import { MetricBadge } from "..";
import { type PointModel } from "../../types";
import { formatCoordinates } from "../../../components/Map/lib";

const calculateAveragesForPoint = (point: PointModel) => {
  const measurements = point.measurements;
  if (measurements.length === 0) return null;

  const sums = measurements.reduce(
    (acc, m) => ({
      temperature: acc.temperature + m.temperature,
      co2: acc.co2 + m.co2_level,
      humidity: acc.humidity + m.humidity,
      pressure: acc.pressure + m.pressure,
    }),
    { temperature: 0, co2: 0, humidity: 0, pressure: 0 }
  );

  return {
    temperature: (sums.temperature / measurements.length).toFixed(1),
    co2: (sums.co2 / measurements.length).toFixed(1),
    humidity: (sums.humidity / measurements.length).toFixed(1),
    pressure: (sums.pressure / measurements.length).toFixed(1),
  };
};

interface PointFromPolygonStatisticCardProps {
  point: PointModel;
}

export const PointFromPolygonStatisticCard: FC<
  PointFromPolygonStatisticCardProps
> = ({ point }) => {
  const navigate = useNavigate();
  const pointAverages = calculateAveragesForPoint(point);

  const handleNavigateToPoint = (pointId: string) => {
    navigate({
      pathname: Paths.statistics,
      search: `entityType=point&entityId=${pointId}`,
    });
  };

  return (
    <Paper
      sx={{
        p: 1.5,
        mb: 1,
        backgroundColor: "var(--card-bg-color)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" sx={{ color: "var(--accent-color)" }}>
            Точка #{point._id}
          </Typography>
          <Typography variant="caption" sx={{ color: "var(--white-color)" }}>
            Координаты:{" "}
            {formatCoordinates([point.longitude, point.latitude], 4)}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => handleNavigateToPoint(point._id)}
          sx={{ color: "var(--primary-color)" }}
        >
          <ArrowForward fontSize="small" />
        </IconButton>
      </Stack>

      {pointAverages ? (
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <MetricBadge
            label="🌡"
            value={String(pointAverages.temperature)}
            unit="°C"
          />
          <MetricBadge
            label="💧"
            value={String(pointAverages.humidity)}
            unit="%"
          />
          <MetricBadge
            label="🫁"
            value={String(pointAverages.co2)}
            unit="ppm"
          />
          <MetricBadge
            label="📟"
            value={String(pointAverages.pressure)}
            unit="мм"
          />
        </Box>
      ) : (
        <Typography
          sx={{
            mt: 1,
            color: "var(--white-color)",
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          Нет данных измерений
        </Typography>
      )}
    </Paper>
  );
};
