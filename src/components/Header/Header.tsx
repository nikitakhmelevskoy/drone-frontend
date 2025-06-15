import styles from "./styles.module.scss";

import cn from "classnames";
import { NavLink, Link } from "react-router";
import { Box, Typography } from "@mui/material";

import { NeonDroneSvg } from "../../shared/ui";
import { Paths } from "../../shared/constants";

const MENU_ITEMS = [
  {
    path: Paths.informationLoad,
    text: "Загрузить данные",
  },
  {
    path: Paths.information,
    text: "Данные",
  },
  {
    path: Paths.map,
    text: "Карта",
  },
  {
    path: Paths.statistics,
    text: "Статистика",
  },
];

export const Header = () => {
  return (
    <>
      <Box className={styles.content}>
        <Box className={styles.logoBlock}>
          <NeonDroneSvg size={85} />
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={Paths.informationLoad}
          >
            <Typography className={styles.logo} variant="h1">
              My<span>Drone</span>
            </Typography>
          </Link>
        </Box>
        <Box className={styles.menuBlock}>
          {MENU_ITEMS.map((menuItem, index) => (
            <NavLink
              key={index}
              to={menuItem.path}
              className={({ isActive }) => {
                return cn(styles.menuItem, {
                  [styles.menuItem_active]: isActive,
                });
              }}
            >
              <Typography variant="h2">{menuItem.text}</Typography>
            </NavLink>
          ))}
        </Box>
      </Box>
      <div className={styles.border} />
    </>
  );
};
