import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { setError } from 'redux/stores/apiErrors/errorSlice';

export const PROXY_URL = '/api/chat';

export const statusErrors: Record<string | number, string> = {
  401: 'Ошибка авторизации (401)',
  403: 'Ошибка авторизации (403)',
  404: 'Запрашиваемый ресурс не найден',
  502: 'Сервис недоступен (502)',
  503: 'Сервис недоступен (503)',
  504: 'Время ожидания ответа превышено (504)',
  network: 'Сервер не ответил, вероятно, проблемы с сетью',
  default: 'Неизвестная сетевая ошибка',
};

const baseApiClient =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: any;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
      responseType?: AxiosRequestConfig['responseType'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, responseType }, api) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        responseType,
      });
      return { data: result.data };
      return result;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      const errorMessage = statusErrors[err.response?.status || ''] || statusErrors.default;

      const errorData = err.response?.data ?? {};
      const { errors } = errorData;

      const description =
        typeof errors === 'string'
          ? errors
          : Object.keys(errors).reduce((total, key) => `${total} ${key.toUpperCase()}: ${errors[key]}`, '');

      api.dispatch(
        setError({
          name: err.name,
          status: err.response?.status,
          title: errorMessage,
          description,
        })
      );

      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default baseApiClient;
