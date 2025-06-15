import styles from "./styles.module.scss";

import { FC, useEffect, useState } from "react";

import { Stack, Box, Typography, Paper, Tabs, Tab } from "@mui/material";

import { getPolygonById } from "../../../shared/api";
import { type PolygonModel } from "../../../shared/types";
import {
  MiniMap,
  MetricPolygonCards,
  PolygonPoints,
} from "../../../components";
import { LoaderDrone } from "../../../shared/ui";
import { LineChart } from "@mui/x-charts";
import { METRIC_CONFIG } from "./constants";

type MetricTab = "temperature" | "co2_level" | "humidity" | "pressure";

interface StatisticsPolygonProps {
  polygonId: string;
}

export const StatisticsPolygon: FC<StatisticsPolygonProps> = ({
  polygonId,
}) => {
  const [polygon, setPolygon] = useState<PolygonModel | null>(null);
  const [activeTab, setActiveTab] = useState<MetricTab>("temperature");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPolygonById(polygonId)
      .then(({ data }) => {
        setPolygon(data);
      })
      .finally(() => setIsLoading(false));
  }, [polygonId]);

  const handleTabChange = (_: any, newValue: MetricTab) => {
    setActiveTab(newValue);
  };

  if (!polygon || isLoading)
    return <LoaderDrone text="Загрузка данных для точки..." />;

  const dataset: {
    x: Date;
    [key: string]: number | Date;
  }[] = [];

  const measurementsLength = Math.max(
    ...polygon.points.map((p) => p.measurements.length)
  );

  for (let i = 0; i < measurementsLength; i++) {
    const entry: { x: Date; [key: string]: number | Date } = {
      x: new Date(polygon.points[0]?.measurements[i]?.createdAt ?? ""),
    };

    polygon.points.forEach((point, pointIdx) => {
      const measurement = point.measurements[i];
      if (measurement) {
        entry[`point-${pointIdx}`] = measurement[activeTab];
      }
    });

    dataset.push(entry);
  }

  dataset.push({
    x: new Date(),
    ["point-228"]: 22,
  });

  console.log("@@ dataset", dataset);

  const seriesConfig = polygon.points.map((_, idx) => ({
    dataKey: `point-${idx}`,
    label: `Точка ${idx + 1}`,
    color: METRIC_CONFIG[activeTab].color,
  }));

  return (
    <Stack sx={{ marginTop: "5px" }} spacing={"15px"}>
      <Box>
        <Typography
          variant="h2"
          sx={{ fontSize: "20px", color: "var(--primary-color)" }}
        >
          Принадлежность полигона:{" "}
          <span style={{ color: "var(--white-color)" }}>
            {polygon?.organizationPoint.name}
          </span>
        </Typography>
      </Box>

      {/* Мини-карта */}
      <Paper
        className={styles.miniMapWrapper}
        sx={{
          margin: "15px 0 0 0 !important",
          p: 2,
          pt: 1,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <Typography variant="h6" sx={{ color: "var(--primary-color)", mb: 1 }}>
          Местоположение на карте
        </Typography>
        <MiniMap polygon={polygon} />
      </Paper>

      <MetricPolygonCards polygon={polygon} />

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
            height={300}
            dataset={dataset} // массив объектов вида { x: string, y: number, id: string }
            series={seriesConfig} // описание, какие поля использовать
            xAxis={[
              {
                scaleType: "point",
                dataKey: "x",
                // valueFormatter: (value: Date, context) => {
                //   return dayjs(value).format(
                //     context.location === "tick" ? "MM.DD" : "DD.MM.YYYY, HH:mm"
                //   );
                // },
              },
            ]}
            yAxis={[{ width: 50 }]}
          />
        </Box>
      </Paper>

      <PolygonPoints points={polygon.points} />
    </Stack>
  );
};
