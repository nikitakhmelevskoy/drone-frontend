// DroneTest.tsx
import { FC } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface DroneTestProps {
  className?: string;
  size?: number;
}

export const DroneTest: FC<DroneTestProps> = ({ className, size = 500 }) => {
  return (
    <svg
      width={size}
      height={size}
      className={cn(styles.neonDroneSvg, className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Тело дрона */}
      <rect
        className={styles.body}
        x="75"
        y="75"
        width="50"
        height="50"
        rx="10"
        ry="10"
      />

      {/* Экран */}
      <rect
        className={styles.screen}
        x="85"
        y="85"
        width="30"
        height="15"
        rx="3"
        ry="3"
      />

      {/* Кнопка */}
      <circle className={styles.button} cx="100" cy="110" r="6" />

      {/* Руки */}
      {[75, 125].flatMap((x, i) =>
        [75, 125].map((y, j) => {
          const dx = x === 75 ? 40 : 160;
          const dy = y === 75 ? 40 : 160;
          return (
            <line
              key={`${i}-${j}`}
              className={styles.arm}
              x1={x}
              y1={y}
              x2={dx}
              y2={dy}
            />
          );
        })
      )}

      {/* Моторы + пропеллеры */}
      {[
        { cx: 40, cy: 40 },
        { cx: 160, cy: 40 },
        { cx: 40, cy: 160 },
        { cx: 160, cy: 160 },
      ].map((m, i) => (
        <g key={i} className={styles.motorGroup}>
          <circle className={styles.motor} cx={m.cx} cy={m.cy} r="10" />
          <rect
            className={styles.propeller}
            x={m.cx - 10}
            y={m.cy - 2}
            width="20"
            height="4"
            rx="2"
            ry="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${m.cx} ${m.cy}`}
              to={`360 ${m.cx} ${m.cy}`}
              dur={`${1 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}

      {/* Слот для SD-карты */}
      <rect
        className={styles.sdSlot}
        x="94"
        y="123"
        width="12"
        height="2"
        rx="1"
        ry="1"
      />

      {/* Траектория движения */}
      <path id="sdPath" d="M 100 145 Q 100 135 100 125" fill="none" />

      {/* SD-карта с анимацией */}
      <g className={styles.sdCardGroup}>
        <g>
          <rect
            className={styles.sdCard}
            x="94"
            y="125"
            width="12"
            height="16"
            rx="2"
            ry="2"
          />
          <line x1="96" y1="127" x2="96" y2="131" className={styles.sdLine} />
          <line x1="98" y1="127" x2="98" y2="131" className={styles.sdLine} />
          <line x1="100" y1="127" x2="100" y2="131" className={styles.sdLine} />
          <text className={styles.sdText} x="100" y="148">
            SD-Карта
          </text>

          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            keyPoints="0;1;0"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          >
            <mpath xlinkHref="#sdPath" />
          </animateMotion>
        </g>
      </g>
    </svg>
  );
};
