import { Feature } from "ol";
import { Point, Polygon } from "ol/geom";

import type {
  MeasurementPointModel,
  OrganizationPointModel,
  PointModel,
  PolygonModel,
} from "../../../shared/types";

export type FeatureType = "polygon" | "point" | "organizationPoint";

export interface PolygonFeature
  extends Feature<Polygon>,
    Omit<PolygonModel, "coordinates"> {
  get(name: "featureType"): "polygon";
  get(name: "_id"): string;
  get(name: "points"): PointModel[];
  get(name: "organizationPoint"): OrganizationPointModel;
}

export interface PointFeature extends Feature<Point>, PointModel {
  get(name: "_id"): string;
  get(name: "featureType"): "point";
  get(name: "measurements"): MeasurementPointModel[];
  get(name: "organizationPoint"): OrganizationPointModel;
  get(name: "latitude"): number;
  get(name: "longitude"): number;
}

export interface OrganizationPointFeature
  extends Feature<Point>,
    Omit<OrganizationPointModel, "latitude" | "longitude"> {
  get(name: "featureType"): "organizationPoint";
  get(name: "_id"): string;
  get(name: "name"): string;
}

export interface PopupData {
  type: FeatureType;
  data: any;
}

export interface PointClickData {
  type: "point";
  data: PointModel;
}

export interface PolygonClickData {
  type: "polygon";
  data: Omit<PolygonModel, "coordinates">;
}

export type ClickData = PointClickData | PolygonClickData;
