import styles from "./styles.module.scss";

import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CloudUpload,
  InsertDriveFile,
  Image,
  Close,
} from "@mui/icons-material";
import { Typography, Box, IconButton } from "@mui/material";
import cn from "classnames";
import { ButtonCustom, Notification } from "../";

interface FileUploaderProps {
  onSend: (files: File[]) => void;
}

export const FileUploader: FC<FileUploaderProps> = ({ onSend }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: File[]) => {
      if (fileRejections.length > 0) {
        setIsError(true);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setIsSuccess(true);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".txt", ".csv"],
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onClickSend = () => {
    onSend(files);
    setFiles([]);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  return (
    <Box>
      <Box
        {...getRootProps()}
        className={cn(styles.dropzone, {
          [styles.dropzone_active]: isDragActive,
          [styles.dropzone_success]: isSuccess,
          [styles.dropzone_error]: isError,
        })}
      >
        <input {...getInputProps()} />
        <CloudUpload className={styles.icon} />
        <Typography variant="h5" className={styles.title}>
          {isDragActive ? "Отпустите файлы здесь" : "Перетащите файлы сюда"}
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          или кликните для выбора файлов
        </Typography>
        <Typography variant="caption" className={styles.subtitle}>
          Поддерживаются TXT, CSV до 10MB
        </Typography>
      </Box>

      {files.length > 0 && (
        <Box className={styles.previewContainer}>
          {files.map((file, index) => (
            <Box key={index} className={styles.previewItem}>
              <Box className={styles.fileInfo}>
                {file.type.startsWith("image/") ? (
                  <Image className={styles.fileIcon} />
                ) : (
                  <InsertDriveFile className={styles.fileIcon} />
                )}
                <Typography variant="body2">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => removeFile(index)}
                className={styles.deleteButton}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {files.length > 0 && (
        <ButtonCustom onClick={onClickSend} sx={{ mt: 1 }}>
          Отправить
        </ButtonCustom>
      )}

      <Notification
        open={isSuccess}
        severity="success"
        onClose={handleClose}
        text="Файл(ы) успешно добавлены!"
      />

      <Notification
        open={isError}
        severity="error"
        onClose={handleClose}
        text="Один или несколько файлов не прошли проверку: размер или тип"
      />
    </Box>
  );
};
