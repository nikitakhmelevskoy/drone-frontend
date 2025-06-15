export interface SimpleResponse {
  message: string;
}

export interface Response<T> extends SimpleResponse {
  data: T;
}

export interface ErrorResponse {
  errorMessage: string;
}
