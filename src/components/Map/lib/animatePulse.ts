import { Feature } from "ol";
import { Circle, Point } from "ol/geom";
import { MAIN_POINT_STYLE } from "./mapConstants";

export const animatePulse = (pointFeature: Feature<Point>) => {
  const start = Date.now();

  const animate = () => {
    const elapsed = Date.now() - start;
    const pulse = 20 + Math.sin(elapsed / 800) * 5;

    const glowStyle = MAIN_POINT_STYLE[0];
    const image = glowStyle.getImage() as unknown as Circle;
    image.setRadius(pulse);

    pointFeature.setStyle(MAIN_POINT_STYLE);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};
