import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api_login, api_user } from '@/apis/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { User } from '@/types/user';
import { USER_QUERY_KEY } from './queryKeys';
import { deleteAccessToken, getAccessToken, setAccessToken } from '@/lib/cookie';

export const useUser = (args?: {
  redirectTo?: (user?: User) => string;
  redirectIfFound?: boolean;
  initialData?: User;
}) => {
  const { redirectTo, redirectIfFound = false, initialData } = args ?? {};

  const router = useRouter();
  const queryClient = useQueryClient();

  const USER_DATA_CACHE_TIME = 1000 * 60 * 60 * 24;
  const USER_DATA_STALE_TIME = 1000 * 60 * 60 * 24;

  const {
    data: user,
    error,
    isFetching: loading,
    refetch,
  } = useQuery<User>(
    [USER_QUERY_KEY],
    () => {
      const accessToken = getAccessToken();
      return api_user({ accessToken: accessToken || '' });
    },
    {
      initialData: initialData ? { ...initialData } : undefined,
      staleTime: USER_DATA_STALE_TIME,
      cacheTime: USER_DATA_CACHE_TIME,
      retry: false,
    }
  );

  useEffect(() => {
    if (error) {
      const status = (error as AxiosError)?.response?.status;

      if (status === 401 || status === 404 || status === 500) {
        deleteAccessToken();
      }
    }

    if (
      !!redirectTo &&
      // If redirectTo is set, redirect if the user was not found.
      // If redirectIfFound is also set, redirect if the user was found
      redirectIfFound === !!user
    ) {
      console.log('useUser redirectTo');

      router.push(redirectTo(user), undefined, { shallow: true });
    }
  }, [user, redirectIfFound, redirectTo, error]);

  /**
   * login
   * @param args
   * email
   * password
   */
  const login = async (args: { email: string; password: string }) => {
    try {
      const accessToken = await api_login(args);
      setAccessToken(accessToken);
      queryClient.invalidateQueries([USER_QUERY_KEY]);
    } catch (error: AxiosError | any) {
      //
      console.log('message:', error.message);
    }
  };

  return {
    user,
    error,
    loading,
    refetch,
    login,
  };
};
