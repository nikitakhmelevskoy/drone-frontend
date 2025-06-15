import { FC, useEffect, useState } from "react";
import { Typography, Box, Stack, Paper, Tabs, Tab } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";

import { formatCoordinates } from "../../../components/Map/lib";
import { MetricPointCards } from "../../../components";
import { getPointById } from "../../../shared/api";
import { LoaderDrone } from "../../../shared/ui";
import { type PointModel } from "../../../shared/types";

interface StatisticsPointProps {
  pointId: string;
}

type MetricTab = "temperature" | "co2" | "humidity" | "pressure";

const METRIC_CONFIG = {
  temperature: {
    label: "температуры",
    chartLabel: "Температура",
    unit: "°C",
    color: "var(--primary-color)",
  },
  co2: {
    label: "CO₂",
    chartLabel: "CO₂",
    unit: "ppm",
    color: "var(--accent-color)",
  },
  humidity: {
    label: "влажности",
    chartLabel: "Влажность",
    unit: "%",
    color: "var(--success-color)",
  },
  pressure: {
    label: "давления",
    chartLabel: "Давление",
    unit: "hPa",
    color: "var(--glow-color)",
  },
};

export const StatisticsPoint: FC<StatisticsPointProps> = ({ pointId }) => {
  const [point, setPoint] = useState<PointModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<MetricTab>("temperature");

  useEffect(() => {
    getPointById(pointId)
      .then(({ data }) => {
        setPoint(data);
      })
      .finally(() => setIsLoading(false));
  }, [pointId]);

  if (!point || isLoading)
    return <LoaderDrone text="Загрузка данных для точки..." />;

  const labels = point.measurements
    .sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))
    .map((m) => dayjs(m.createdAt).format("DD.MM.YYYY, HH:mm"));

  const metricsData = {
    temperature: point.measurements.map((m) => m.temperature),
    co2: point.measurements.map((m) => m.co2_level),
    humidity: point.measurements.map((m) => m.humidity),
    pressure: point.measurements.map((m) => m.pressure),
  };

  const handleTabChange = (_: any, newValue: MetricTab) => {
    setActiveTab(newValue);
  };

  return (
    <Stack sx={{ marginTop: "5px" }} spacing={4}>
      <Box>
        <Typography
          variant="h2"
          sx={{ fontSize: "20px", color: "var(--primary-color)" }}
        >
          Принадлежность точки:{" "}
          <span style={{ color: "var(--white-color)" }}>
            {point.organizationPoint.name}
          </span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: "5px",
            fontSize: "20px",
            color: "var(--primary-color)",
          }}
        >
          Координаты:{" "}
          <span style={{ color: "var(--white-color)" }}>
            {formatCoordinates([point.longitude, point.latitude], 4)}
          </span>
        </Typography>
      </Box>
      <MetricPointCards point={point} />
      {/* Графики с табами */}
      <Paper sx={{ p: 0, backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: "1px solid var(--border-color)",
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--primary-color)",
            },
          }}
        >
          {Object.entries(METRIC_CONFIG).map(([key, config]) => (
            <Tab
              key={key}
              label={config.chartLabel}
              value={key}
              sx={{
                color: "var(--white-color)",
                opacity: 0.7,
                "&.Mui-selected": {
                  color: "var(--primary-color)",
                  opacity: 1,
                },
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "var(--white-color)" }}
          >
            {`Динамика ${METRIC_CONFIG[activeTab].label} ( ${METRIC_CONFIG[activeTab].unit} )`}
          </Typography>
          <LineChart
            xAxis={[
              {
                tickLabelStyle: { fontSize: 11 },
                scaleType: "point",
                data: labels,
                valueFormatter: (value, context) => {
                  if (context.location === "tick") {
                    return dayjs(value).format("MM.DD");
                  }
                  return value;
                },
              },
            ]}
            series={[
              {
                data: metricsData[activeTab],
                label: METRIC_CONFIG[activeTab].chartLabel,
                color: METRIC_CONFIG[activeTab].color,
              },
            ]}
            height={300}
          />
        </Box>
      </Paper>
    </Stack>
  );
};
