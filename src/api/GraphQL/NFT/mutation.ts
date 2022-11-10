//---------------------------------------------------------------------------------------------------//
// NFT Add, Update, Delete Functions

import { gql } from 'graphql-request';
import { AddNFTsInput } from '../../../types/Models/NFT/AddNFTs/AddNFTsInput';
import { AddNFTsPayload } from '../../../types/Models/NFT/AddNFTs/AddNFTsPayload';
import { DeleteAllNFTsInput } from '../../../types/Models/NFT/DeleteAllNFTs/DeleteAllNFTsInput';
import { DeleteAllNFTsPayload } from '../../../types/Models/NFT/DeleteAllNFTs/DeleteAllNFTsPayload';
import { DeleteNFTsInput } from '../../../types/Models/NFT/DeleteNFTs/DeleteNFTsInput';
import { DeleteNFTsPayload } from '../../../types/Models/NFT/DeleteNFTs/DeleteNFTsPayload';
import { UpdateNFTInput } from '../../../types/Models/NFT/UpdateNFTs/UpdateNFTInput';
import { UpdateNFTPayload } from '../../../types/Models/NFT/UpdateNFTs/UpdateNFTPayload';
import { getGraphQLHeaders, graphQLClient } from '../../api';

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
    const updateNFTPayload: UpdateNFTPayload = response?.updateNFT || {};
    return updateNFTPayload;
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
