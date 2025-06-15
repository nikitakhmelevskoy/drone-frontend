import { FC, useMemo } from "react";
import { Typography, Stack, Paper } from "@mui/material";

import { MetricCard } from "../../shared/ui";
import { type PointModel } from "../../shared/types";

interface MetricPointCardsProps {
  point: PointModel;
}

export const MetricPointCards: FC<MetricPointCardsProps> = ({ point }) => {
  const averageValues = useMemo(() => {
    const count = point.measurements.length;
    if (count === 0) return null;

    const sums = point.measurements.reduce(
      (acc, m) => ({
        temperature: acc.temperature + m.temperature,
        co2: acc.co2 + m.co2_level,
        humidity: acc.humidity + m.humidity,
        pressure: acc.pressure + m.pressure,
      }),
      { temperature: 0, co2: 0, humidity: 0, pressure: 0 }
    );

    return {
      temperature: Math.round(sums.temperature / count),
      co2: Math.round(sums.co2 / count),
      humidity: Math.round(sums.humidity / count),
      pressure: Math.round(sums.pressure / count),
    };
  }, [point]);

  if (!averageValues) return null;

  return (
    <Paper sx={{ p: 2, backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
      <Typography variant="h6" sx={{ color: "var(--primary-color)", mb: 2 }}>
        Средние показатели
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
