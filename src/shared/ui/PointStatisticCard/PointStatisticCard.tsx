import { FC } from "react";
import { useNavigate } from "react-router";
import { Box, Paper, Typography } from "@mui/material";

import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { Paths } from "../../constants";
import { formatCoordinates } from "../../../components/Map/lib";

interface PointStatisticCardProps {
  pointId: string;
  latitude: number;
  longitude: number;
  temperature: string;
  co2_level: string;
  humidity: string; // влажность
  pressure: string; // давление
}

export const PointStatisticCard: FC<PointStatisticCardProps> = ({
  latitude,
  longitude,
  temperature,
  co2_level,
  humidity,
  pressure,
  pointId,
}) => {
  const navigate = useNavigate();

  const onClickPointMoreStat = () => {
    navigate({
      pathname: Paths.statistics,
      search: `entityType=point&entityId=${pointId}`,
    });
  };

  return (
    <Paper
      sx={{
        marginTop: "0px !important",
        backgroundColor: "var(--card-bg-color)",
        border: "1px solid var(--glow-color)",
        boxShadow: "0 0 10px var(--glow-color)",
        borderRadius: "12px",
        p: 2,
        color: "var(--white-color)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 0 15px var(--accent-color)",
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          color: "var(--accent-color)",
          mb: 1,
          fontSize: "16px",
        }}
      >
        Точка: {pointId}
      </Typography>

      <Typography sx={{ fontSize: "14px" }}>
        📍 Координаты: {formatCoordinates([longitude, latitude], 4)}
      </Typography>

      <Box mt={1}>
        <Typography
          variant="body2"
          sx={{ fontSize: "13px", color: "var(--primary-color)" }}
        >
          Средние значения:
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          🌡 Температура: {temperature} °C
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          💧 Влажность: {humidity} %
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          🫁 CO₂: {co2_level} ppm
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          📟 Давление: {pressure} мм
        </Typography>
      </Box>

      <ButtonCustom
        sx={{ mt: 2, width: "100%" }}
        onClick={onClickPointMoreStat}
      >
        Подробная статистика
      </ButtonCustom>
    </Paper>
  );
};
