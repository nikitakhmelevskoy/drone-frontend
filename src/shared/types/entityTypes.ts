export interface MeasurementDeviceModel {
  _id: string;
  name: string;
  manufacturer: string;
  serialNumber: string;
}

export interface MeasurementPointModel {
  _id: string;
  temperature: number;
  co2_level: number;
  humidity: number; // влажность
  pressure: number; // давление
  createdAt: string;
  measurementDevice: MeasurementDeviceModel;
}

export interface OrganizationPointModel {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface PointModel {
  _id: string;
  latitude: number;
  longitude: number;
  measurements: MeasurementPointModel[];
  organizationPoint: OrganizationPointModel;
}

export interface PolygonModel {
  _id: string;
  coordinates: number[][];
  points: PointModel[];
  organizationPoint: OrganizationPointModel;
}
