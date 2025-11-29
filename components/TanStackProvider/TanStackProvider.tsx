'use client';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import React, { useState } from 'react';
import { DehydratedState } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
};

export default function TanStackProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  );
}
