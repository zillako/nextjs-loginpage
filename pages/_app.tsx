import { useQueryClientState } from '@/lib/reactQuery';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useQueryClientState();

  const setVh = useCallback(() => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setVh);
    setVh();

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, [setVh]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
