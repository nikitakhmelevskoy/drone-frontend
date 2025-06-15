import styles from "./styles.module.scss";

import { FC } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";

import { type PolygonModel } from "../../types";
import { PointFromPolygonStatisticCard } from "..";
import { Paths } from "../../constants";
import { declensionPoints } from "../../lib";
import { MiniMap } from "../../../components";

interface PolygonStatisticCardProps {
  polygon: PolygonModel;
}

export const PolygonStatisticCard: FC<PolygonStatisticCardProps> = ({
  polygon,
}) => {
  const navigate = useNavigate();

  const handleNavigateToPolygon = (polygonId: string) => {
    navigate({
      pathname: Paths.statistics,
      search: `entityType=polygon&entityId=${polygonId}`,
    });
  };
  return (
    <Paper
      sx={{
        minWidth: "320px",
        minHeight: "200px",
        p: 2.5,
        backgroundColor: "var(--card-bg-color)",
        border: "1px solid var(--border-color)",
        boxShadow: "0 0 10px var(--glow-color)",
        borderRadius: "12px",
        color: "var(--white-color)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 0 15px var(--accent-color)",
        },
      }}
    >
      <Stack sx={{ height: "100%" }} spacing={1.5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "var(--accent-color)",
              fontSize: "1.1rem",
              fontWeight: "medium",
            }}
          >
            {polygon.organizationPoint.name}
          </Typography>
          <Chip
            label={declensionPoints(polygon.points.length)}
            size="small"
            sx={{
              bgcolor: "var(--primary-color)",
              color: "var(--white-color)",
              fontSize: "0.75rem",
            }}
          />
        </Box>

        <Stack flexGrow={1} spacing={2}>
          <MiniMap
            targetId={polygon._id}
            polygon={polygon}
            className={styles.miniMap}
          />

          <Box>
            {polygon.points.map((point) => (
              <PointFromPolygonStatisticCard key={point._id} point={point} />
            ))}
          </Box>
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={() => handleNavigateToPolygon(polygon._id)}
          sx={{
            color: "var(--accent-color)",
            borderColor: "var(--primary-color)",
            "&:hover": {
              borderColor: "var(--accent-color)",
              backgroundColor: "rgba(0, 191, 255, 0.08)",
            },
          }}
        >
          Подробная статистика
        </Button>
      </Stack>
    </Paper>
  );
};
