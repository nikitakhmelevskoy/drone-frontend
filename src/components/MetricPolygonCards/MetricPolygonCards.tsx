import { FC, useMemo } from "react";
import { Typography, Stack, Paper } from "@mui/material";

import { MetricCard } from "../../shared/ui";
import { type PolygonModel } from "../../shared/types";

interface MetricPolygonCardsProps {
  polygon: PolygonModel;
}

export const MetricPolygonCards: FC<MetricPolygonCardsProps> = ({
  polygon,
}) => {
  const averageValues = useMemo(() => {
    if (polygon.points.length === 0) return null;

    const allMeasurements = polygon.points.flatMap(
      (point) => point.measurements
    );
    const measurementCount = allMeasurements.length;

    if (measurementCount === 0) return null;

    const sums = allMeasurements.reduce(
      (acc, m) => ({
        temperature: acc.temperature + m.temperature,
        co2: acc.co2 + m.co2_level,
        humidity: acc.humidity + m.humidity,
        pressure: acc.pressure + m.pressure,
      }),
      { temperature: 0, co2: 0, humidity: 0, pressure: 0 }
    );

    return {
      temperature: Math.round(sums.temperature / measurementCount),
      co2: Math.round(sums.co2 / measurementCount),
      humidity: Math.round(sums.humidity / measurementCount),
      pressure: Math.round(sums.pressure / measurementCount),
    };
  }, [polygon]);

  if (!averageValues) return null;

  return (
    <Paper sx={{ p: 2, backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
      <Typography variant="h6" sx={{ color: "var(--primary-color)", mb: 2 }}>
        Средние показатели по всем точкам
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <MetricCard
          title="Температура"
          value={averageValues.temperature}
          unit="°C"
          color="var(--primary-color)"
        />
        <MetricCard
          title="CO₂"
          value={averageValues.co2}
          unit="ppm"
          color="var(--accent-color)"
        />
        <MetricCard
          title="Влажность"
          value={averageValues.humidity}
          unit="%"
          color="var(--success-color)"
        />
        <MetricCard
          title="Давление"
          value={averageValues.pressure}
          unit="hPa"
          color="var(--glow-color)"
        />
      </Stack>
    </Paper>
  );
};
