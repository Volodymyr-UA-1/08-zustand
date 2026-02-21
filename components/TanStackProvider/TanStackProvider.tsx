'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';

interface TanStackProviderProps {
    children: ReactNode;
    dehydratedState?: unknown;
}

export default function TanStackProvider({ children, dehydratedState }: TanStackProviderProps) {
    const [queryClient] = useState(() => {
        const client = new QueryClient();
        if (dehydratedState) {
            hydrate(client, dehydratedState);
        }
        return client;
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}