import { Circle, Fill, Stroke, Style } from "ol/style";

export const MAP_TARGET_ID = "map";

export const MINI_MAP_TARGET_ID = "miniMap";

export const MAP_TILES_API_URL =
  "https://api.maptiler.com/maps/019690d8-2965-7306-b308-5ed6041f45be/style.json?key=aIIH2TLTQGTuteAf6oBb";

export const WGS84_PROJECTION = "EPSG:4326"; // Географическая проекция, координаты WGS84 (широта/долгота)

export const WEB_MERCATOR_PROJECTION = "EPSG:3857"; // Проекция Web Mercator (для OpenLayers)

export const VGU_COORDINATES = [4_364_371.807213246, 6_738_297.108359874];

export const VECTOR_LAYER_STYLE = [
  // Стиль для точек с неоновым эффектом
  new Style({
    image: new Circle({
      radius: 4,
      fill: new Fill({
        color: "rgba(0, 191, 255, 0.8)", // primary-color
      }),
      stroke: new Stroke({
        color: "rgba(0, 255, 255, 0.9)", // accent-color
        width: 2,
      }),
    }),
  }),
  // Стиль свечения для точек
  new Style({
    image: new Circle({
      radius: 7,
      stroke: new Stroke({
        color: "rgba(0, 191, 255, 0.3)", // glow-color
        width: 4,
      }),
    }),
  }),

  // Neon стили для полигона
  new Style({
    fill: new Fill({
      color: "rgba(17, 17, 51, 0.3)",
    }),
    stroke: new Stroke({
      color: "#00ffff",
      width: 2,
    }),
  }),
  // Glow стили для полигона
  new Style({
    stroke: new Stroke({
      color: "rgba(0, 191, 255, 0.1)",
      width: 12,
    }),
  }),
];

export const MAIN_POINT_STYLE = [
  new Style({
    // Пульсирующее свечение
    image: new Circle({
      radius: 20,
      stroke: new Stroke({
        color: "rgba(0, 255, 255, 0.3)", // мягкий голубой
        width: 10,
      }),
    }),
  }),
  new Style({
    // Внешнее кольцо
    image: new Circle({
      radius: 10,
      stroke: new Stroke({
        color: "rgba(0, 200, 255, 0.7)",
        width: 2,
      }),
    }),
  }),
  new Style({
    // Внутренний круг
    image: new Circle({
      radius: 6,
      fill: new Fill({
        color: "rgba(0, 150, 255, 1)",
      }),
      stroke: new Stroke({
        color: "rgba(255, 255, 255, 0.9)",
        width: 1.5,
      }),
    }),
  }),
];
