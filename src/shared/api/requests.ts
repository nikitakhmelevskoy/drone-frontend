import { api } from "./instance";
import { type AxiosError } from "axios";
import type { SimpleResponse, ErrorResponse, Response } from "./types";
import type { PointModel, PolygonModel } from "../types";

export const uploadFile = async (files: File[]): Promise<SimpleResponse> => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("sdData", file);
    });

    const { data } = await api.post<SimpleResponse>("/upload", formData);

    return data;
  } catch (_err) {
    const err = _err as AxiosError<ErrorResponse>;

    const errorMessage =
      err?.response?.data?.errorMessage ||
      err?.message ||
      "Неизвестная ошибка при загрузке файла";

    return Promise.reject(errorMessage);
  }
};

export const getAllPolygons = async (): Promise<Response<PolygonModel[]>> => {
  try {
    const { data } = await api.get<Response<PolygonModel[]>>("/getAllPolygons");
    return data;
  } catch (_err) {
    const err = _err as AxiosError<ErrorResponse>;

    const errorMessage =
      err?.response?.data?.errorMessage ||
      err?.message ||
      "Неизвестная ошибка при получении полигонов";

    return Promise.reject(errorMessage);
  }
};

export const getAllPoints = async (): Promise<Response<PointModel[]>> => {
  try {
    const { data } = await api.get<Response<PointModel[]>>("/getAllPoints");
    return data;
  } catch (_err) {
    const err = _err as AxiosError<ErrorResponse>;

    const errorMessage =
      err?.response?.data?.errorMessage ||
      err?.message ||
      "Неизвестная ошибка при получении точек";

    return Promise.reject(errorMessage);
  }
};

export const getPointById = async (
  pointId: string
): Promise<Response<PointModel>> => {
  try {
    const { data } = await api.get<Response<PointModel>>(
      `/getPointById/${pointId}`
    );
    return data;
  } catch (_err) {
    const err = _err as AxiosError<ErrorResponse>;

    const errorMessage =
      err?.response?.data?.errorMessage ||
      err?.message ||
      "Неизвестная ошибка при получении точки";

    return Promise.reject(errorMessage);
  }
};

export const getPolygonById = async (
  polygonId: string
): Promise<Response<PolygonModel>> => {
  try {
    const { data } = await api.get<Response<PolygonModel>>(
      `/getPolygonById/${polygonId}`
    );
    return data;
  } catch (_err) {
    const err = _err as AxiosError<ErrorResponse>;

    const errorMessage =
      err?.response?.data?.errorMessage ||
      err?.message ||
      "Неизвестная ошибка при получении полигона";

    return Promise.reject(errorMessage);
  }
};
