'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default function ReactQueryProvider({ children }: { children: ReactNode }) {

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      console.error(error);
    },
  }),
});
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
