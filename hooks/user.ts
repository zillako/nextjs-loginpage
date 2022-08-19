import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api_login, api_logout, api_user } from '@/apis/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { User } from '@/types/user';
import { USER_QUERY_KEY } from './queryKeys';
import { deleteAccessToken, getAccessToken, setAccessToken } from '@/lib/cookie';

export const useUser = (args?: {
  redirectTo?: string;
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
    async () => {
      const accessToken = getAccessToken();
      return await api_user({ accessToken: accessToken || '' }).catch(() => {
        return null;
      });
    },
    {
      initialData: initialData ? { ...initialData } : undefined,
      staleTime: USER_DATA_STALE_TIME,
      cacheTime: USER_DATA_CACHE_TIME,
      retry: false,
    }
  );

  useEffect(() => {
    // If redirectTo is set, redirect if the user was not found.
    // If redirectIfFound is also set, redirect if the user was found
    if (!loading && !!redirectTo && redirectIfFound === !!user) {
      router.push(redirectTo, undefined, { shallow: true });
    }
  }, [user, redirectIfFound, redirectTo, loading, router]);

  /**
   * login
   * @param args email, password
   */
  const login = useCallback(
    async (args: { email: string; password: string }) => {
      const accessToken = await api_login(args);
      setAccessToken(accessToken);
      queryClient.invalidateQueries([USER_QUERY_KEY]);
    },
    [queryClient]
  );

  /**
   * logout
   */
  const logout = useCallback(async () => {
    const accessToken = getAccessToken();
    await api_logout({ accessToken });
    deleteAccessToken();
    queryClient.resetQueries([USER_QUERY_KEY]);
  }, [queryClient]);

  return {
    user,
    error,
    loading,
    refetch,
    login,
    logout,
  };
};
