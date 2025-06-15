import { FC } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface DroneSdCardProps {
  className?: string;
  size?: number;
}

export const DroneSdCard: FC<DroneSdCardProps> = ({
  className,
  size = 500,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={cn(styles.neonDroneSvg, className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Корпус дрона */}
      <rect
        className={styles.body}
        x="75"
        y="75"
        width="50"
        height="50"
        rx="10"
      />

      {/* Экран */}
      <rect
        className={styles.screen}
        x="85"
        y="85"
        width="30"
        height="15"
        rx="3"
      />
      <circle className={styles.button} cx="100" cy="110" r="6" />

      {/* Руки */}
      {[
        [75, 75, 40, 40],
        [125, 75, 160, 40],
        [75, 125, 40, 160],
        [125, 125, 160, 160],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} className={styles.arm} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}

      {/* Моторы и пропеллеры */}
      {[
        { cx: 40, cy: 40 },
        { cx: 160, cy: 40 },
        { cx: 40, cy: 160 },
        { cx: 160, cy: 160 },
      ].map((m, i) => (
        <g key={i} className={styles.motorGroup}>
          <circle className={styles.motor} cx={m.cx} cy={m.cy} r="8" />
          <rect
            className={styles.propeller}
            x={m.cx - 10}
            y={m.cy - 2}
            width="20"
            height="4"
            rx="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${m.cx} ${m.cy}`}
              to={`360 ${m.cx} ${m.cy}`}
              dur={`${1 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}

      {/* Слот для SD-карты */}
      <rect
        className={styles.sdSlot}
        x="92"
        y="145"
        width="16"
        height="8"
        rx="1"
      />

      {/* SD-карта с анимацией */}
      <g className={styles.sdCardGroup}>
        <path
          className={styles.sdCard}
          d="M95 145 h10 a2 2 0 0 1 2 2 v16 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2 v-16 a2 2 0 0 1 2 -2 z"
        />
        <rect className={styles.sdNotch} x="96" y="147" width="1" height="3" />
        <rect className={styles.sdNotch} x="98" y="147" width="1" height="3" />
        <rect className={styles.sdNotch} x="100" y="147" width="1" height="3" />
      </g>

      <text x="100" y="172" textAnchor="middle" className={styles.sdLabel}>
        SD-Карта
      </text>
    </svg>
  );
};
