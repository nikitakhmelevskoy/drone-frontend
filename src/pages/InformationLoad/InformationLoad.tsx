import styles from "./styles.module.scss";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  PaperCustom,
  FileUploader,
  DroneSdCard,
  Notification,
  LoaderDrone,
} from "../../shared/ui";
import { uploadFile } from "../../shared/api";

export const InformationLoad = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMessage("");
  };

  const onSend = (files: File[]) => {
    setIsLoading(true);
    uploadFile(files)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err: string) => {
        setErrorMessage(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PaperCustom sx={{ marginTop: "50px" }}>
      <Box className={styles.wrapper}>
        <Box className={styles.uploadBlock}>
          <Typography className={styles.title} variant="h2">
            Загрузка данных с <span>SD-карты</span>
          </Typography>
          <Typography className={styles.descr} variant="h2">
            для загрузки используйте форму ниже
          </Typography>
          <FileUploader onSend={onSend} />
        </Box>
        <DroneSdCard />
      </Box>
      <Notification
        autoHideDuration={5_000}
        open={isSuccess}
        severity="success"
        onClose={handleClose}
        text="Файл(ы) успешно загружены в БД!"
      />

      {isLoading && <LoaderDrone />}

      {errorMessage && (
        <Notification
          autoHideDuration={5_000}
          open={!!errorMessage}
          severity="error"
          onClose={handleClose}
          text={errorMessage}
        />
      )}
    </PaperCustom>
  );
};
