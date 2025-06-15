import styles from "./styles.module.scss";

import { FC, useMemo } from "react";
import { Box, Divider } from "@mui/material";

import { type PolygonModel } from "../../types";
import { ButtonCustom } from "..";
import dayjs from "dayjs";

interface PolygonCardInfoProps {
  onClose?: () => void;
  polygon: Omit<PolygonModel, "coordinates">;
  onClickMoreStat?: () => void;
}

export const PolygonCardInfo: FC<PolygonCardInfoProps> = ({
  polygon,
  onClose,
  onClickMoreStat,
}) => {
  const allMeasurements = useMemo(() => {
    return polygon.points.flatMap((p) => p.measurements);
  }, [polygon.points]);

  const average = useMemo(() => {
    const count = allMeasurements.length;
    const sum = allMeasurements.reduce(
      (acc, m) => {
        acc.temperature += m.temperature;
        acc.co2_level += m.co2_level;
        acc.humidity += m.humidity;
        acc.pressure += m.pressure;
        return acc;
      },
      { temperature: 0, co2_level: 0, humidity: 0, pressure: 0 }
    );
    return {
      temperature: (sum.temperature / count).toFixed(1),
      co2_level: (sum.co2_level / count).toFixed(0),
      humidity: (sum.humidity / count).toFixed(0),
      pressure: (sum.pressure / count).toFixed(0),
    };
  }, [allMeasurements]);

  const [minDate, maxDate] = useMemo(() => {
    const sorted = [...allMeasurements].sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );
    return [sorted.at(0)?.createdAt, sorted.at(-1)?.createdAt];
  }, [allMeasurements]);

  return (
    <div className={styles.infoCard}>
      <button className={styles.closeButton} onClick={onClose} title="Закрыть">
        ✕
      </button>
      <h2 className={styles.title}>Полигон с точками</h2>

      <p>
        <span>Организация:</span> {polygon.organizationPoint.name}
      </p>
      <p>
        <span>ID:</span> {polygon._id}
      </p>
      <p>
        <span>Количество точек:</span> {polygon.points.length}
      </p>
      <p>
        <span>Измерений всего:</span> {allMeasurements.length}
      </p>

      <Divider sx={{ my: 1, borderColor: "var(--border-color)" }} />

      <h3>Средние значения</h3>
      <p>
        <span>Температура:</span> {average.temperature} °C
      </p>
      <p>
        <span>CO₂:</span> {average.co2_level} ppm
      </p>
      <p>
        <span>Влажность:</span> {average.humidity} %
      </p>
      <p>
        <span>Давление:</span> {average.pressure} hPa
      </p>

      <Divider sx={{ my: 1, borderColor: "var(--border-color)" }} />

      <h3>Диапазон измерений</h3>
      <p>
        <span>С:</span>{" "}
        {minDate ? dayjs(minDate).format("DD.MM.YYYY HH:mm") : "—"}
      </p>
      <p>
        <span>По:</span>{" "}
        {maxDate ? dayjs(maxDate).format("DD.MM.YYYY HH:mm") : "—"}
      </p>

      <Divider sx={{ my: 1, borderColor: "var(--border-color)" }} />

      <Box
        sx={{
          marginTop: "2rem",
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
