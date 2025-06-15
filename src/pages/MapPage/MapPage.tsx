import styles from "./styles.module.scss";

import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { Map } from "../../components";
import { PaperCustom } from "../../shared/ui";
import { getAllPolygons } from "../../shared/api";
import { type PolygonModel } from "../../shared/types";

export const MapPage = () => {
  const [polygons, setPolygons] = useState<PolygonModel[]>([]);

  useEffect(() => {
    getAllPolygons().then(({ data }) => {
      setPolygons(data);
    });
  }, []);

  return (
    <PaperCustom sx={{ marginTop: "20px" }}>
      <Typography className={styles.title} variant="h2">
        Карта
      </Typography>
      <Map polygons={polygons} />
    </PaperCustom>
  );
};
