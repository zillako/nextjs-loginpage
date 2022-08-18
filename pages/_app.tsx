import { useQueryClientState } from '@/lib/reactQuery';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useQueryClientState();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default MyApp;
