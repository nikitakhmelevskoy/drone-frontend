import styles from "./styles.module.scss";

import { FC } from "react";
import { Snackbar, Alert } from "@mui/material";
import cn from "classnames";

interface NotificationProps {
  open?: boolean;
  onClose?: () => void;
  text: string;
  severity?: "error" | "info" | "success" | "warning";
  autoHideDuration?: number | null;
}

export const Notification: FC<NotificationProps> = ({
  open = false,
  onClose,
  text,
  severity = "info",
  autoHideDuration = 2_000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        className={cn(styles.alert, {
          [styles.alert_success]: severity === "success",
          [styles.alert_error]: severity === "error",
        })}
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
