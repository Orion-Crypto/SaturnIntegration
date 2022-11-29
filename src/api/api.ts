import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_SATURN_GRAPHQL_API_URL as string);

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
            update: () => `/nft/update`,
            delete: () => `/nft/delete`,
        },
        nftproject: {
            add: () => `/nftproject/add`,
            createSingleOrBulkMintTransaction: () => `/nftproject/createSingleOrBulkMintTransaction`,
            submitSingleOrBulkMintTransaction: () => `/nftproject/submitSingleOrBulkMintTransaction`,
            createBuyDirectMintTransaction: () => `/nftproject/createBuyDirectMintTransaction`,
            submitBuyDirectMintTransaction: () => `/nftproject/submitBuyDirectMintTransaction`,
        },
    },
});

export const getGraphQLHeaders = () => {
    const headers: any = {} as HeadersInit;
    try {
        const apiKey = process.env.SATURN_API_KEY;
        headers['Authorization'] = `Bearer ${apiKey}`;
        return headers;
    } catch (error) {
        console.error(error);
        return headers;
    }
};
