import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState, useRef } from "react";

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
};

interface MetricCardProps {
  title: string;
  value: number;
  color: string;
  unit?: string;
  duration?: number;
  decimals?: number;
}

export const MetricCard: FC<MetricCardProps> = ({
  title,
  value: targetValue,
  color,
  unit = "",
  duration = 1500,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const requestRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);
  const startValue = 0;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutExpo(progress);
      const currentValue =
        startValue + (targetValue - startValue) * easedProgress;

      setDisplayValue(parseFloat(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [targetValue, duration, decimals]);

  return (
    <Box
      sx={{
        p: 2,
        flex: "1 1 200px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderLeft: `4px solid ${color}`,
        minWidth: "200px",
        borderRadius: 1,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 4px 12px ${color}33`,
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "var(--white-color)",
          opacity: 0.8,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color,
          fontWeight: 500,
          fontSize: "1.75rem",
          lineHeight: 1.2,
        }}
      >
        {displayValue.toLocaleString()} {unit}
      </Typography>
    </Box>
  );
};
