import { gql } from 'graphql-request';
import { GraphQLParameters } from '../../../types/GraphQLParameters';
import { GetBuyRandomMintPaymentInput } from '../../../types/Models/NFTProjects/BuyRandomMint/GetBuyRandomMintPayment/GetBuyRandomMintPaymentInput';
import { GetBuyRandomMintPaymentPayload } from '../../../types/Models/NFTProjects/BuyRandomMint/GetBuyRandomMintPayment/GetBuyRandomMintPaymentPayload';
import { GetBuyRandomMintPurchasesInput } from '../../../types/Models/NFTProjects/BuyRandomMint/GetBuyRandomMintPurchases/GetBuyRandomMintPurchasesInput';
import { GetBuyRandomMintPurchasesPayload } from '../../../types/Models/NFTProjects/BuyRandomMint/GetBuyRandomMintPurchases/GetBuyRandomMintPurchasesPayload';
import { getGraphQLHeaders, graphQLClient } from '../../api';
import { calculateStringFromParameters } from '../parameters';

//---------------------------------------------------------------------------------------------------//
// Get NFTProject Functions
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
export const queryBuyRandomMintPayment = async (getBuyRandomMintPaymentInput: GetBuyRandomMintPaymentInput) => {
    if (getBuyRandomMintPaymentInput == null || getBuyRandomMintPaymentInput.nftProjectId == null) return null;

    const input = { input: getBuyRandomMintPaymentInput };
    const response = await graphQLClient.request(
        gql`
            query BuyRandomMintPayment($input: GetBuyRandomMintPaymentInput!) {
                buyRandomMintPayment(input: $input) {
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

    const nftProject: GetBuyRandomMintPaymentPayload = response?.buyRandomMintPayment || {};
    return nftProject;
};

export const queryBuyRandomMintPurchases = async (getBuyRandomMintPurchasesInput: GetBuyRandomMintPurchasesInput) => {
    if (!getBuyRandomMintPurchasesInput) return null;

    const input = { input: getBuyRandomMintPurchasesInput };
    const response = await graphQLClient.request(
        gql`
            query BuyRandomMintPurchases($input: GetBuyRandomMintPurchasesInput!) {
                buyRandomMintPurchases(input: $input) {
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
    const purchasedNFTs: GetBuyRandomMintPurchasesPayload = response?.buyRandomMintPurchases || {};
    return purchasedNFTs;
};
//---------------------------------------------------------------------------------------------------//
