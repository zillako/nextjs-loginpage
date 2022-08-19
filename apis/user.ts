import { AxiosError, AxiosResponse } from 'axios';
import { request } from './base';

/**
 * 로그인
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
 * 로그아
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
 * @error
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

/**
 * 인증 코드 발급 요청
 * @error
 * - 400 :
 */
export const api_reset_password_issue = async (args: {
  email: string;
}): Promise<{ issueToken?: string; remainMillisecond?: number }> => {
  const endpoint = `/api/reset-password`;

  const res = await request.get(endpoint, {
    params: {
      email: args.email,
    },
  });

  if (res.status === 200) {
    return res.data;
  }

  return {};
};

/**
 * 인증 코드 검증
 * @error
 * - 400 :
 * - 401 :
 */
export const api_reset_password_confirm = async (args: {
  email: string;
  authCode: string;
  issueToken: string;
}) => {
  const endpoint = `/api/reset-password`;

  const res = await request.post(endpoint, args);

  if (res.status === 200) {
    return res.data.confirmToken;
  }

  return '';
};

/**
 * 비밀번호 변경
 * @error
 * - 400 :
 * - 401 :
 */
export const api_reset_password_change = async (args: {
  email: string;
  confirmToken: string;
  newPassword: string;
  newPasswordConfirm: string;
}) => {
  const endpoint = `/api/reset-password`;

  await request.patch(endpoint, args);
};
