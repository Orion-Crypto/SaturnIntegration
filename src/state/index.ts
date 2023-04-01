import { QueryClient } from '@tanstack/react-query';

const cacheTime = Infinity;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: cacheTime,
        },
    },
});
