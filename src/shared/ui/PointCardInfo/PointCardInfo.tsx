import styles from "./styles.module.scss";

import { FC, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import type { MeasurementPointModel, PointModel } from "../../types";
import { formatCoordinates } from "../../../components/Map/lib";
import { ButtonCustom } from "..";
import dayjs from "dayjs";

interface PointCardInfoProps {
  point: PointModel;
  onClose?: () => void;
  onClickMoreStat?: () => void;
}

const metricLabels: Record<string, string> = {
  temperature: "Температура (°C)",
  co2_level: "CO₂ (ppm)",
  humidity: "Влажность (%)",
  pressure: "Давление (гПа)",
};

const metricColors: Record<string, string> = {
  temperature: "#00ffff",
  co2_level: "#ff3366",
  humidity: "#66ff66",
  pressure: "#ffa500",
};

export const PointCardInfo: FC<PointCardInfoProps> = ({
  point,
  onClose,
  onClickMoreStat,
}) => {
  const measurements = point.measurements
    .slice(-6)
    .sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)));

  const labels = measurements.map((m) =>
    dayjs(m.createdAt).format("DD.MM.YYYY, HH:mm")
  );

  const [selectedMetric, setSelectedMetric] = useState("temperature");

  const handleMetricChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedMetric(newValue);
  };

  return (
    <div className={styles.infoCard}>
      <button className={styles.closeButton} onClick={onClose} title="Закрыть">
        ✕
      </button>
      <h2 className={styles.title}>Точка с измерениями</h2>
      <p>
        <span>Организация: </span>
        {point.organizationPoint.name}
      </p>
      <p>
        <span>ID:</span> {point._id}
      </p>
      <p>
        <span>Координаты:</span>{" "}
        {formatCoordinates([point.longitude, point.latitude])}
      </p>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          mb: 1,
          backgroundColor: "var(--card-bg-color)",
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          padding: "4px",
        }}
      >
        <Tabs
          value={selectedMetric}
          onChange={handleMetricChange}
          variant="scrollable"
          sx={{
            minHeight: 0,
            "& .MuiTab-root": {
              minHeight: 0,
              padding: "4px 8px",
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "6px",
              transition: "background-color 0.2s",
              "&.Mui-selected": {},
              "&:hover": {
                backgroundColor: "rgba(0, 191, 255, 0.2)",
              },
            },
          }}
        >
          {Object.entries(metricLabels).map(([key, label]) => (
            <Tab key={key} label={label} value={key} />
          ))}
        </Tabs>
      </Box>

      <div className={styles.chartWrapper}>
        <LineChart
          xAxis={[
            {
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
              data: measurements.map(
                (m) =>
                  m[selectedMetric as keyof MeasurementPointModel] as number
              ),
              label: metricLabels[selectedMetric],
              color: metricColors[selectedMetric],
            },
          ]}
          width={300}
          height={200}
        />
      </div>

      <Box
        sx={{
          marginTop: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonCustom onClick={onClickMoreStat}>
          Подробная статистика
        </ButtonCustom>
      </Box>
    </div>
  );
};
