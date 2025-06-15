import styles from "./styles.module.scss";

import { FC } from "react";
import { Button, type ButtonProps } from "@mui/material";
import cn from "classnames";

export const ButtonCustom: FC<ButtonProps> = ({ ...rest }) => {
  return (
    <Button
      size="large"
      variant="contained"
      color="primary"
      className={cn(styles.button, styles.button_one)}
      {...rest}
    />
  );
};
