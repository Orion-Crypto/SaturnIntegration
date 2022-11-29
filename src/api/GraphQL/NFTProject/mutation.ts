import { gql } from 'graphql-request';
import { CancelBuyDirectMintTransactionInput } from '../../../types/Models/NFTProjects/BuyDirectMint/CancelBuyDirectMintTransaction/CancelBuyDirectMintTransactionInput';
import { CancelBuyDirectMintTransactionPayload } from '../../../types/Models/NFTProjects/BuyDirectMint/CancelBuyDirectMintTransaction/CancelBuyDirectMintTransactionPayload';
import { CreateBuyDirectMintTransactionInput } from '../../../types/Models/NFTProjects/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionInput';
import { CreateBuyDirectMintTransactionPayload } from '../../../types/Models/NFTProjects/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionPayload';
import { SubmitBuyDirectMintTransactionInput } from '../../../types/Models/NFTProjects/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';
import { SubmitBuyDirectMintTransactionPayload } from '../../../types/Models/NFTProjects/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionPayload';
import { CreateRoyaltyMintTransactionInput } from '../../../types/Models/NFTProjects/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';
import { CreateRoyaltyMintTransactionPayload } from '../../../types/Models/NFTProjects/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionPayload';
import { AddNFTProjectsPayload } from '../../../types/Models/NFTProjects/CRUDData/AddNFTProjects/AddNFTProjectsPayload';
import { DeleteNFTProjectsInput } from '../../../types/Models/NFTProjects/CRUDData/DeleteNFTProjects/DeleteNFTProjectsInput';
import { DeleteNFTProjectsPayload } from '../../../types/Models/NFTProjects/CRUDData/DeleteNFTProjects/DeleteNFTsPayload';
import { UpdateNFTProjectInput } from '../../../types/Models/NFTProjects/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';
import { UpdateNFTProjectPayload } from '../../../types/Models/NFTProjects/CRUDData/UpdateNFTProject/UpdateNFTProjectPayload';
import { CancelSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CancelSingleOrBulkMintTransaction/CancelSingleOrBulkMintTransactionInput';
import { CancelSingleOrBulkMintTransactionPayload } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CancelSingleOrBulkMintTransaction/CancelSingleOrBulkMintTransactionPayload';
import { CreateSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';
import { CreateSingleOrBulkBurnTransactionPayload } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionPayload';
import { SubmitSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';
import { SubmitSingleOrBulkMintTransactionPayload } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionPayload';
import { SubmitRoyaltyMintTransactionInput } from '../../../types/Models/NFTProjects/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionInput';
import { SubmitRoyaltyMintTransactionPayload } from '../../../types/Models/NFTProjects/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionPayload';
import { getGraphQLHeaders, graphQLClient } from '../../api';

//---------------------------------------------------------------------------------------------------//
// NFTProject Add, Update, Delete Functions
//---------------------------------------------------------------------------------------------------//
export const mutateAddNFTProjects = async () => {
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation AddNFTProjects() {
                addNFTProjects() {
                    nftProject {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `
    );

    const addNFTProjectsPayload: AddNFTProjectsPayload = response?.addNFTProjects;
    const nftProject: any = addNFTProjectsPayload?.nftProject || {};
    return nftProject;
};

export const mutateUpdateNFTProject = async (input: UpdateNFTProjectInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation UpdateNFTProject($input: UpdateNFTProjectInput!) {
                updateNFTProject(input: $input) {
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

    const updateNFTProjectPayload: UpdateNFTProjectPayload = response?.updateNFTProject;
    const nftProject: any = updateNFTProjectPayload?.nftProject || {};
    return nftProject;
};

export const mutateDeleteNFTProjects = async (input: DeleteNFTProjectsInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation DeleteNFTProjects($input: DeleteNFTProjectsInput!) {
                deleteNFTProjects(input: $input) {
                    nftProjects {
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

    const deleteNFTProjects: DeleteNFTProjectsPayload = response?.deleteNFTProjects;
    const nftProjects: any = deleteNFTProjects.nftProjects || {};
    return nftProjects;
};
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Royalty Minting Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateRoyaltyMintTransaction = async (input: CreateRoyaltyMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation CreateRoyaltyMintTransaction($input: CreateRoyaltyMintTransactionInput!) {
                createRoyaltyMintTransaction(input: $input) {
                    hexTransaction
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const createRoyaltyMintTransactionPayload: CreateRoyaltyMintTransactionPayload = response?.createRoyaltyMintTransaction || {};
    return createRoyaltyMintTransactionPayload;
};

export const mutateSubmitRoyaltyMintTransaction = async (input: SubmitRoyaltyMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation SubmitRoyaltyMintTransaction($input: SubmitRoyaltyMintTransactionInput!) {
                submitRoyaltyMintTransaction(input: $input) {
                    transactionId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitRoyaltyMintTransactionPayload: SubmitRoyaltyMintTransactionPayload = response?.submitRoyaltyMintTransaction || {};
    return submitRoyaltyMintTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Single Or Bulk NFT Minting Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateSingleOrBulkMintTransaction = async (input: CreateSingleOrBulkMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation CreateSingleOrBulkMintTransaction($input: CreateSingleOrBulkMintTransactionInput!) {
                createSingleOrBulkMintTransaction(input: $input) {
                    hexTransaction
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const createSingleOrBulkMintTransactionPayload: CreateSingleOrBulkBurnTransactionPayload =
        response?.createSingleOrBulkMintTransaction || {};
    return createSingleOrBulkMintTransactionPayload;
};

export const mutateSubmitSingleOrBulkMintTransaction = async (input: SubmitSingleOrBulkMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation SubmitSingleOrBulkMintTransaction($input: SubmitSingleOrBulkMintTransactionInput!) {
                submitSingleOrBulkMintTransaction(input: $input) {
                    transactionId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const submitSingleOrBulkMintTransactionPayload: SubmitSingleOrBulkMintTransactionPayload =
        response?.submitSingleOrBulkMintTransaction || {};
    return submitSingleOrBulkMintTransactionPayload;
};

export const mutateCancelSingleOrBulkMintTransaction = async (input: CancelSingleOrBulkMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation CancelSingleOrBulkMintTransaction($input: CancelSingleOrBulkMintTransactionInput!) {
                cancelSingleOrBulkMintTransaction(input: $input) {
                    nftProjectId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const cancelSingleOrBulkMintTransactionPayload: CancelSingleOrBulkMintTransactionPayload =
        response?.cancelSingleOrBulkMintTransaction || {};
    return cancelSingleOrBulkMintTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Single Or Bulk NFT Minting Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateBuyDirectMintTransaction = async (input: CreateBuyDirectMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation CreateBuyDirectMintTransaction($input: CreateBuyDirectMintTransactionInput!) {
                createBuyDirectMintTransaction(input: $input) {
                    hexTransaction
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const createBuyDirectMintTransaction: CreateBuyDirectMintTransactionPayload = response?.createBuyDirectMintTransaction || {};
    return createBuyDirectMintTransaction;
};

export const mutateSubmitBuyDirectMintTransaction = async (input: SubmitBuyDirectMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation SubmitBuyDirectMintTransaction($input: SubmitBuyDirectMintTransactionInput!) {
                submitSingleOrBulkMintTransaction(input: $input) {
                    transactionId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const submitBuyDirectMintTransactionPayload: SubmitBuyDirectMintTransactionPayload = response?.submitSingleOrBulkMintTransaction || {};
    return submitBuyDirectMintTransactionPayload;
};

export const mutateCancelBuyDirectBulkMintTransaction = async (input: CancelBuyDirectMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation CancelBuyDirectBulkMintTransaction($input: CancelBuyDirectMintTransactionInput!) {
                cancelBuyDirectBulkMintTransaction(input: $input) {
                    nftProjectId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const cancelBuyDirectBulkMintTransaction: CancelBuyDirectMintTransactionPayload = response?.cancelBuyDirectBulkMintTransaction || {};
    return cancelBuyDirectBulkMintTransaction;
};
//---------------------------------------------------------------------------------------------------//
