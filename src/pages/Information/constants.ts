import { GridColDef } from "@mui/x-data-grid";

export interface PointRow {
  id: number;
  organization: string;
  latitude: number;
  longitude: number;
  temperature: number;
  co2: number;
  humidity: number;
  pressure: number;
  measurementTime: string;
}

export const columns: GridColDef<PointRow>[] = [
  {
    field: "organization",
    headerName: "Организация",
    flex: 1,
    minWidth: 300,
  },
  {
    field: "latitude",
    headerName: "Широта",
    width: 100,
    valueFormatter: (value?: number) => (value ? `${value.toFixed(4)}°` : "—"),
    flex: 1,
    minWidth: 200,
  },
  {
    field: "longitude",
    headerName: "Долгота",
    width: 100,
    valueFormatter: (value?: number) => (value ? `${value.toFixed(4)}°` : "—"),
    flex: 1,
    minWidth: 200,
  },
  {
    field: "temperature",
    headerName: "Температура (°C)",
    width: 140,
    valueFormatter: (value?: number) => `${value}°C`,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "co2",
    headerName: "Уровень СО₂ (ppm)",
    width: 160,
    valueFormatter: (value?: number) => `${value} ppm`,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "humidity",
    headerName: "Влажность (%)",
    width: 140,
    valueFormatter: (value?: number) => `${value}%`,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "pressure",
    headerName: "Давление (hPA)",
    width: 140,
    valueFormatter: (value?: number) => `${value} hPA`,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "measurementTime",
    headerName: "Время измерения",
    width: 160,
    valueFormatter: (value: string) => new Date(value).toLocaleString(),
    flex: 1,
    minWidth: 200,
  },
];
