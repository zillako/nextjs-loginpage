import { AxiosError, AxiosResponse } from 'axios';
import { request } from './base';

/**
 * 로그인
 * @param args email, password
 * @returns accessToken
 * @error
 * - 400 : 잘못된 비밀번호에요
 * - 404 : email과 일치하는 회원 정보가 없어요
 */
export const api_login = async (args: { email: string; password: string }) => {
  const endpoint = '/api/login';
  const res = await request.post(endpoint, { email: args.email, password: args.password });

  if (res.status === 200) {
    return res.data.accessToken;
  }

  return '';
};

/**
 * 로그아웃
 * @param args accessToken
 * @returns lastConnectedAt
 * @error
 * - 401 : 인증 정보가 잘못 되었어요
 * - 404 : email과 일치하는 회원 정보가 없어요
 */
export const api_logout = async (args: { accessToken?: string }) => {
  const endpoint = '/api/logout';
  const accessToken = args.accessToken;
  if (!accessToken) {
    const newError = new AxiosError();
    newError.status = '401';
    newError.message = '인증 정보가 잘못 되었어요';

    throw newError;
  }

  const res = await request.post(
    endpoint,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (res.status === 200) {
    return res.data.lastConnectedAt;
  }

  return '';
};

/**
 * 회원 정보 조회
 * @param args accessToken
 * @returns User
 * - 401 : 인증 정보가 잘못 되었어요
 * - 404 :
 */
export const api_user = async (args: { accessToken?: string }) => {
  const endpoint = `/api/user`;
  const accessToken = args.accessToken;
  if (!accessToken) {
    const newError = new AxiosError();
    newError.status = '401';
    newError.message = '인증 정보가 잘못 되었어요';

    throw newError;
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
};
