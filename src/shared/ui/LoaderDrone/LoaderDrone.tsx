import styles from "./styles.module.scss";

import { FC } from "react";

interface LoaderDroneProps {
  text?: string;
}

export const LoaderDrone: FC<LoaderDroneProps> = ({
  text = "Загрузка данных с дрона...",
}) => {
  return (
    <div className={styles.loaderWrapper}>
      <svg
        className={styles.drone}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.float}>
          {/* Тело дрона */}
          <circle cx="60" cy="60" r="15" className={styles.body} />

          {/* Руки и пропеллеры */}
          <line x1="60" y1="60" x2="20" y2="30" className={styles.arm} />
          <circle cx="20" cy="30" r="5" className={styles.propeller} />

          <line x1="60" y1="60" x2="100" y2="30" className={styles.arm} />
          <circle cx="100" cy="30" r="5" className={styles.propeller} />

          <line x1="60" y1="60" x2="20" y2="90" className={styles.arm} />
          <circle cx="20" cy="90" r="5" className={styles.propeller} />

          <line x1="60" y1="60" x2="100" y2="90" className={styles.arm} />
          <circle cx="100" cy="90" r="5" className={styles.propeller} />

          {/* SD-карта */}
          <rect
            x="53"
            y="80"
            width="14"
            height="18"
            rx="2"
            className={styles.sdcard}
          />
        </g>
      </svg>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
