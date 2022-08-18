import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app';
const request = axios.create({
  baseURL: BASE_URL,
});

export const api_login = async (args: { email: string; password: string }) => {
  try {
    const endpoint = '/api/login';
    const res = await request.post(endpoint, { email: args.email, password: args.password });

    if (res.status === 200) {
      return res.data.accessToken;
    }

    return '';
  } catch (error: AxiosError | any) {
    if (error.response) {
      console.log(error.response.status, error.message);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    throw error;
  }
};

export const api_user = async (args: { accessToken: string }) => {
  try {
    const endpoint = `/api/user`;
    const accessToken = args.accessToken;
    if (!accessToken) {
      throw new Error('No access token');
    }

    const res = await request.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    return '';
  } catch (error: AxiosError | any) {
    if (error.response) {
      console.log(error.response.status, error.message);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    throw error;
  }
};
