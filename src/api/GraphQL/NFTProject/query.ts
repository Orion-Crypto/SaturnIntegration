//---------------------------------------------------------------------------------------------------//
// Get NFTProject Functions

import { gql } from 'graphql-request';
import { GraphQLParameters } from '../../../types/GraphQLParameters';
import { GetNFTProjectPaymentInput } from '../../../types/Models/NFTProjects/GetNFTProjectPayment/GetNFTProjectPaymentInput';
import { GetNFTProjectPaymentPayload } from '../../../types/Models/NFTProjects/GetNFTProjectPayment/GetNFTProjectPaymentPayload';
import { GetNFTProjectPurchasesInput } from '../../../types/Models/NFTProjects/GetNFTProjectPurchases/GetNFTProjectPurchasesInput';
import { GetNFTProjectPurchasesPayload } from '../../../types/Models/NFTProjects/GetNFTProjectPurchases/GetNFTProjectPurchasesPayload';
import { getGraphQLHeaders, graphQLClient } from '../../api';
import { calculateStringFromParameters } from '../parameters';

//---------------------------------------------------------------------------------------------------//
export const queryNFTProject = async (id: string) => {
    if (!id) return null;

    graphQLClient.setHeaders(getGraphQLHeaders());
    const input = { id: id };
    const response = await graphQLClient.request(
        gql`
            query NFTProject($id: String!) {
                nFTProject(id: $id) {
                    id
                }
            }
        `,
        input
    );
    const nftProject: any = response?.nFTProject || {};
    return nftProject;
};

export const queryNFTProjects = async (parameters?: GraphQLParameters) => {
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            query {
                nFTProjects(${calculateStringFromParameters(parameters)}) {
                    id
                }
            }
        `
    );
    const nftProjects: any = response?.nFTProjects || {};
    return nftProjects;
};
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Get NFTProject Mint Functions
//---------------------------------------------------------------------------------------------------//
export const queryNFTProjectPayment = async (nftProjectPaymentInput: GetNFTProjectPaymentInput) => {
    if (nftProjectPaymentInput == null || nftProjectPaymentInput.nftProjectId == null) return null;

    const input = { input: nftProjectPaymentInput };
    const response = await graphQLClient.request(
        gql`
            query NFTProjectPayment($input: GetNFTProjectPaymentInput!) {
                nFTProjectPayment(input: $input) {
                    id
                    name
                    blockchain
                    network
                    policyId
                    reservedNFTs
                    completedNFTs
                    totalNFTs
                    price
                    maxPerTx
                    maxPerWallet
                    mintStart
                    mintEnd
                    lockAfterDatetime
                    isActive
                    isFreeMint
                    error {
                        message
                    }
                }
            }
        `,
        input
    );

    const nftProject: GetNFTProjectPaymentPayload = response?.nFTProjectPayment || {};
    return nftProject;
};

export const queryNFTProjectPurchases = async (nftProjectPurchasesInput: GetNFTProjectPurchasesInput) => {
    if (!nftProjectPurchasesInput) return null;

    const input = { input: nftProjectPurchasesInput };
    const response = await graphQLClient.request(
        gql`
            query NFTProjectPurchases($input: GetNFTProjectPurchasesInput!) {
                nFTProjectPurchases(input: $input) {
                    nftProjectId
                    address
                    purchasedNFTs {
                        name
                        image
                    }
                    error {
                        message
                    }
                }
            }
        `,
        input
    );
    const purchasedNFTs: GetNFTProjectPurchasesPayload = response?.nFTProjectPurchases || {};
    return purchasedNFTs;
};
//---------------------------------------------------------------------------------------------------//
