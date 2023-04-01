import { gql } from 'graphql-request';
import { GraphQLParameters } from '../../../types/GraphQLParameters';
import { GetBuyRandomMintPaymentInput } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/GetBuyRandomMintPayment/GetBuyRandomMintPaymentInput';
import { GetBuyRandomMintPaymentPayload } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/GetBuyRandomMintPayment/GetBuyRandomMintPaymentPayload';
import { GetBuyRandomMintPurchasesInput } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/GetBuyRandomMintPurchases/GetBuyRandomMintPurchasesInput';
import { GetBuyRandomMintPurchasesPayload } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/GetBuyRandomMintPurchases/GetBuyRandomMintPurchasesPayload';
import { GetPublicNFTProjectInput } from '../../../types/Models/NFTProject/GraphQL/CRUDData/GetPublicNFTProjects/GetPublicNFTProjectsInput';
import { GetPublicNFTProjectPayload } from '../../../types/Models/NFTProject/GraphQL/CRUDData/GetPublicNFTProjects/GetPublicNFTProjectsPayload';
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
export const queryBuyRandomMintPayment = async (buyRandomMintPaymentInput: GetBuyRandomMintPaymentInput) => {
    if (buyRandomMintPaymentInput == null || buyRandomMintPaymentInput.nftProjectId == null) return null;

    const input = { input: buyRandomMintPaymentInput };
    const response = await graphQLClient.request(
        gql`
            query BuyRandomMintPayment($input: GetBuyRandomMintPaymentInput!) {
                buyRandomMintPayment(input: $input) {
                    id
                    name
                    blockchain
                    network
                    policy_id
                    reserved_nfts
                    completed_nfts
                    total_nfts
                    address_pending_or_completed_nfts
                    address_mints_allowed
                    is_mint_active_for_address
                    prices {
                        buy_mint_ada_price {
                            ada_price
                            allow_ada_payment
                            is_main_price
                        }
                        buy_mint_token_prices {
                            token_price
                            token_full_name
                            token_name
                            token_image
                            token_decimals
                            allow_token_payment
                        }
                    }
                    max_per_tx
                    max_per_wallet
                    lock_after_datetime
                    is_active
                    is_free_mint
                    mint_start
                    mint_end
                    public_mint_start
                    whitelist_slot_mints {
                        id
                        whitelist_slot {
                            id
                            whitelist {
                                id
                                whitelist_started_time
                                whitelist_ended_time
                                default_nfts_per_slot
                            }
                        }
                    }
                    error {
                        message
                    }
                }
            }
        `,
        input
    );

    const buyRandomMintPayment: GetBuyRandomMintPaymentPayload = response?.buyRandomMintPayment || {};
    return buyRandomMintPayment;
};

export const queryBuyRandomMintPurchases = async (buyRandomMintPurchasesInput: GetBuyRandomMintPurchasesInput) => {
    if (!buyRandomMintPurchasesInput) return null;

    const input = { input: buyRandomMintPurchasesInput };
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
    const buyRandomMintPurchases: GetBuyRandomMintPurchasesPayload = response?.buyRandomMintPurchases;
    return buyRandomMintPurchases;
};
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Get Public NFTProject Functions
//---------------------------------------------------------------------------------------------------//
export const queryPublicNFTProject = async (id: string) => {
    if (!id) return null;

    const input: GetPublicNFTProjectInput = { nftProjectId: id };
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            query PublicNFTProject($input: GetPublicNFTProjectInput!) {
                publicNFTProject(input: $input) {
                    nftProject {
                        id
                        name
                        policy_id
                        upgrade_project {
                            id
                            prices {
                                ada_price
                                allow_ada_payment
                                is_main_price
                                token_prices {
                                    token_price
                                    token_full_name
                                    token_name
                                    token_image
                                    allow_token_payment
                                }
                            }
                        }
                    }
                    error {
                        message
                        link
                    }
                }
            }
        `,
        parameters
    );
    const getPublicNFTProjectsPayload: GetPublicNFTProjectPayload = response?.publicNFTProject || {};
    return getPublicNFTProjectsPayload;
};
//---------------------------------------------------------------------------------------------------//
