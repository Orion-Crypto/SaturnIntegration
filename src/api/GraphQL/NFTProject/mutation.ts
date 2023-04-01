import { gql } from 'graphql-request';
import { CreateRoyaltyMintTransactionInput } from '../../../types/Models/NFTProject/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';
import { CreateRoyaltyMintTransactionPayload } from '../../../types/Models/NFTProject/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionPayload';
import { AddNFTProjectsPayload } from '../../../types/Models/NFTProject/CRUDData/AddNFTProjects/AddNFTProjectsPayload';
import { DeleteNFTProjectsInput } from '../../../types/Models/NFTProject/CRUDData/DeleteNFTProjects/DeleteNFTProjectsInput';
import { DeleteNFTProjectsPayload } from '../../../types/Models/NFTProject/CRUDData/DeleteNFTProjects/DeleteNFTsPayload';
import { UpdateNFTProjectInput } from '../../../types/Models/NFTProject/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';
import { UpdateNFTProjectPayload } from '../../../types/Models/NFTProject/CRUDData/UpdateNFTProject/UpdateNFTProjectPayload';
import { CancelBuyDirectMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyDirectMint/CancelBuyDirectMintTransaction/CancelBuyDirectMintTransactionInput';
import { CancelBuyDirectMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/BuyDirectMint/CancelBuyDirectMintTransaction/CancelBuyDirectMintTransactionPayload';
import { CreateBuyDirectMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionInput';
import { CreateBuyDirectMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionPayload';
import { SubmitBuyDirectMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';
import { SubmitBuyDirectMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionPayload';
import { CreateBuyRandomMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/CreateBuyRandomMintTransaction/CreateBuyRandomMintTransactionInput';
import { CreateBuyRandomMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/CreateBuyRandomMintTransaction/CreateBuyRandomMintTransactionPayload';
import { SubmitBuyRandomMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/SubmitBuyRandomMintTransaction/SubmitBuyRandomMintTransactionInput';
import { SubmitBuyRandomMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/SubmitBuyRandomMintTransaction/SubmitBuyRandomMintTransactionPayload';
import { StartMintInput } from '../../../types/Models/NFTProject/GraphQL/CRUDData/StartMint/StartMintInput';
import { StartMintPayload } from '../../../types/Models/NFTProject/GraphQL/CRUDData/StartMint/StartMintPayload';
import { CancelSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/CancelSingleOrBulkMintTransaction/CancelSingleOrBulkMintTransactionInput';
import { CancelSingleOrBulkMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/CancelSingleOrBulkMintTransaction/CancelSingleOrBulkMintTransactionPayload';
import { CreateSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';
import { CreateSingleOrBulkBurnTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionPayload';
import { SubmitSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';
import { SubmitSingleOrBulkMintTransactionPayload } from '../../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionPayload';
import { SubmitRoyaltyMintTransactionInput } from '../../../types/Models/NFTProject/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionInput';
import { SubmitRoyaltyMintTransactionPayload } from '../../../types/Models/NFTProject/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionPayload';
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
// Buy Random NFT Minting Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateBuyRandomMintTransaction = async (input: CreateBuyRandomMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation CreateBuyRandomMintTransaction($input: CreateBuyRandomMintTransactionInput!) {
                createBuyRandomMintTransaction(input: $input) {
                    hexTransaction
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const createBuyRandomMintTransactionPayload: CreateBuyRandomMintTransactionPayload = response?.createBuyRandomMintTransaction || {};
    return createBuyRandomMintTransactionPayload;
};

export const mutateSubmitBuyRandomMintTransaction = async (input: SubmitBuyRandomMintTransactionInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation SubmitBuyRandomMintTransaction($input: SubmitBuyRandomMintTransactionInput!) {
                submitBuyRandomMintTransaction(input: $input) {
                    transactionId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitBuyRandomMintTransactionPayload: SubmitBuyRandomMintTransactionPayload = response?.submitBuyRandomMintTransaction || {};
    return submitBuyRandomMintTransactionPayload;
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
                submitBuyDirectMintTransaction(input: $input) {
                    transactionId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const submitBuyDirectMintTransactionPayload: SubmitBuyDirectMintTransactionPayload = response?.submitBuyDirectMintTransaction || {};
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

//---------------------------------------------------------------------------------------------------//
// NFT Start Functions
//---------------------------------------------------------------------------------------------------//
export const mutateStartMint = async (input: StartMintInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response = await graphQLClient.request(
        gql`
            mutation StartMint($input: StartMintInput!) {
                startMint(input: $input) {
                    nftProjectId
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const startMint: StartMintPayload = response?.startMint || {};
    return startMint;
};
//---------------------------------------------------------------------------------------------------//
