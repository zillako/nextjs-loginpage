import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';

const REACT_QUERY_CACHE_TIME = 1000 * 60 * 60;
const REACT_QUERY_STALE_TIME = 1000 * 60 * 5;

export const newQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: REACT_QUERY_CACHE_TIME,
        staleTime: REACT_QUERY_STALE_TIME,
      },
    },
  });
};

export const useQueryClientState = () => {
  const [queryClient] = useState(() => newQueryClient());

  return [queryClient];
};
