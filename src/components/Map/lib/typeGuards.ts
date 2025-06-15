import { Feature } from "ol";
import type {
  PolygonFeature,
  PointFeature,
  OrganizationPointFeature,
} from "../hooks";

export const isPolygonFeature = (
  feature: Feature
): feature is PolygonFeature => {
  return feature.get("featureType") === "polygon";
};

export const isPointFeature = (feature: Feature): feature is PointFeature => {
  return feature.get("featureType") === "point";
};

export const isOrganizationPointFeature = (
  feature: Feature
): feature is OrganizationPointFeature => {
  return feature.get("featureType") === "organizationPoint";
};
