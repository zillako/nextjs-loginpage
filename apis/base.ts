import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app';

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError | any) => {
    if (error?.response?.status) {
      error.status = error?.response?.status;
    }

    if (error?.response?.data?.error?.message) {
      error.message = error?.response?.data?.error?.message;
    }

    return Promise.reject(error);
  }
);

export const extractErrorMessage = (error: AxiosError | any) => {
  return (error as AxiosError)?.message;
};

export const extractErrorStatus = (error: AxiosError | any) => {
  return Number((error as AxiosError)?.response?.status || (error as AxiosError)?.status || 200);
};
