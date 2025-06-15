import styles from "./styles.module.scss";

import { FC, ReactNode } from "react";
import { Paper, type PaperProps } from "@mui/material";
import cn from "classnames";

interface PaperCustomProps extends PaperProps {
  children?: ReactNode;
}

export const PaperCustom: FC<PaperCustomProps> = ({ className, ...rest }) => {
  return (
    <Paper
      className={cn(styles.paper, className)}
      variant="outlined"
      {...rest}
    />
  );
};
