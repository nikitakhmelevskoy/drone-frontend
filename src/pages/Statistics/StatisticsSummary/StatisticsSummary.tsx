import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import { type PolygonModel } from "../../../shared/types";
import { getAllPolygons } from "../../../shared/api";
import { LoaderDrone, PolygonStatisticCard } from "../../../shared/ui";

export const StatisticsSummary = () => {
  const [polygons, setPolygons] = useState<PolygonModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllPolygons()
      .then(({ data }) => {
        setPolygons((old) => [...old, ...data]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoaderDrone text="Загрузка полигонов..." />;

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          color: "var(--accent-color)",
          mb: 3,
          mt: "5px",
          fontWeight: "medium",
        }}
      >
        Выберите полигон
      </Typography>

      {polygons.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            color: "var(--white-color)",
            mt: 4,
          }}
        >
          Нет доступных полигонов
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 5,
          }}
        >
          {polygons.map((polygon, index) => (
            <PolygonStatisticCard key={index} polygon={polygon} />
          ))}
        </Box>
      )}
    </Box>
  );
};
