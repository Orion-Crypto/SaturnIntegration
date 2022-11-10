//export const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string);

class API {
    baseURL: string;
    endpoints: any;

    constructor({ baseURL, endpoints }: any) {
        this.baseURL = baseURL;
        this.endpoints = endpoints;
    }
}
export const saturnAPI = new API({
    baseURL: 'http://localhost:3000/api',
    endpoints: {
        nft: {
            add: () => `/nft/add`,
        },
    },
});

// export const getGraphQLHeaders = async () => {
//     const headers: any = {} as HeadersInit;
//     try {
//         const jwt = getJWTToken() as string;
//         const refreshToken = getRefreshToken();
//         const isExpired = isJWTExpired(jwt);
//         if (jwt && !isExpired) {
//             headers['Authorization'] = `Bearer ${jwt}`;
//             return headers;
//         }

//         const apiKey = getAPIKey();
//         if (apiKey) {
//             headers['Authorization'] = `Bearer ${apiKey}`;
//             return headers;
//         }

//         if (!jwt && !refreshToken) {
//             return headers;
//         }

//         if (jwt && refreshToken && isExpired) {
//             const newTokens = await fetchRefreshLogin(refreshToken);
//             setJWTToken(newTokens.jwt);
//             setRefreshToken(newTokens.refreshToken);

//             headers['Authorization'] = `Bearer ${newTokens.jwt}`;
//             return headers;
//         }

//         if (!jwt && refreshToken) {
//             const newTokens = await fetchRefreshLogin(refreshToken);
//             setJWTToken(newTokens.jwt);
//             setRefreshToken(newTokens.refreshToken);

//             headers['Authorization'] = `Bearer ${newTokens.jwt}`;
//             return headers;
//         }

//         return headers;
//     } catch (error) {
//         console.error(error);
//         return headers;
//     }
// };
