import { FC } from "react";
import cn from "classnames";

import "./styles.css";

interface NeonDroneSvgProps {
  className?: string;
  size?: number;
}

export const NeonDroneSvg: FC<NeonDroneSvgProps> = ({
  className,
  size = 500,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={cn("neon-drone-svg", className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Сканирующий луч */}
      <line className="nd-scanner" x1="0" y1="0" x2="200" y2="0" />

      {/* Тело дрона */}
      <rect
        className="nd-body"
        x="75"
        y="75"
        width="50"
        height="50"
        rx="10"
        ry="10"
      />

      {/* Центральный экран */}
      <rect
        className="nd-screen"
        x="85"
        y="85"
        width="30"
        height="15"
        rx="3"
        ry="3"
      />

      {/* Центральная кнопка */}
      <circle className="nd-button" cx="100" cy="110" r="6" />

      {/* Руки дрона */}
      {[
        { x1: 75, y1: 75, x2: 40, y2: 40 },
        { x1: 125, y1: 75, x2: 160, y2: 40 },
        { x1: 75, y1: 125, x2: 40, y2: 160 },
        { x1: 125, y1: 125, x2: 160, y2: 160 },
      ].map((arm, i) => (
        <line key={i} className="nd-arm" {...arm} />
      ))}

      {/* Моторы и пропеллеры */}
      {[
        { cx: 40, cy: 40 },
        { cx: 160, cy: 40 },
        { cx: 40, cy: 160 },
        { cx: 160, cy: 160 },
      ].map((m, i) => (
        <g key={i} className="nd-motor-group">
          <circle className="nd-motor" cx={m.cx} cy={m.cy} r="10" />
          <rect
            className="nd-propeller"
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

      {/* Трассы */}
      <path className="nd-trace" d="M100 110 L100 150 L160 150" />
      <path className="nd-trace" d="M100 110 L100 50 L40 50" />

      <defs>
        <filter id="nd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};
