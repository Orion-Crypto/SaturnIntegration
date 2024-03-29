import { gql } from 'graphql-request';
import { AddNFTsInput } from '../../../types/Models/NFT/GraphQL/AddNFTs/AddNFTsInput';
import { AddNFTsPayload } from '../../../types/Models/NFT/GraphQL/AddNFTs/AddNFTsPayload';
import { DeleteAllNFTsInput } from '../../../types/Models/NFT/GraphQL/DeleteAllNFTs/DeleteAllNFTsInput';
import { DeleteAllNFTsPayload } from '../../../types/Models/NFT/GraphQL/DeleteAllNFTs/DeleteAllNFTsPayload';
import { DeleteNFTsInput } from '../../../types/Models/NFT/GraphQL/DeleteNFTs/DeleteNFTsInput';
import { DeleteNFTsPayload } from '../../../types/Models/NFT/GraphQL/DeleteNFTs/DeleteNFTsPayload';
import { UpdateNFTInput } from '../../../types/Models/NFT/GraphQL/UpdateNFTs/UpdateNFTInput';
import { UpdateNFTPayload } from '../../../types/Models/NFT/GraphQL/UpdateNFTs/UpdateNFTPayload';
import { getGraphQLHeaders, graphQLClient } from '../../api';

//---------------------------------------------------------------------------------------------------//
// NFT Add, Update, Delete Functions
//---------------------------------------------------------------------------------------------------//
export const mutateAddNFTs = async (input: AddNFTsInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation AddNFTs($input: AddNFTsInput!) {
                addNFTs(input: $input) {
                    nfts {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const addNFTsPayload: AddNFTsPayload = response?.addNFTs;
    const nfts = addNFTsPayload?.nfts || {};
    return nfts;
};

export const mutateUpdateNFT = async (input: UpdateNFTInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation UpdateNFT($input: UpdateNFTInput!) {
                updateNFT(input: $input) {
                    nft {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const updateNFTPayload: UpdateNFTPayload = response?.updateNFT;
    const nft = updateNFTPayload.nft || {};
    return nft;
};

export const mutateDeleteNFTs = async (input: DeleteNFTsInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation DeleteNFTs($input: DeleteNFTsInput!) {
                deleteNFTs(input: $input) {
                    nftProject {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const deleteNFTsPayload: DeleteNFTsPayload = response?.deleteNFTs || {};
    return deleteNFTsPayload;
};

export const mutateDeleteAllNFTs = async (input: DeleteAllNFTsInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation DeleteAllNFTs($input: DeleteAllNFTsInput!) {
                deleteAllNFTs(input: $input) {
                    nftProject {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const deleteAllNFTsPayload: DeleteAllNFTsPayload = response?.deleteAllNFTs || {};
    return deleteAllNFTsPayload;
};
//---------------------------------------------------------------------------------------------------//
