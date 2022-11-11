import { gql } from 'graphql-request';
import { AddNFTProjectsPayload } from '../../../types/Models/NFTProjects/AddNFTProjects/AddNFTProjectsPayload';
import { DeleteNFTProjectsInput } from '../../../types/Models/NFTProjects/DeleteNFTProjects/DeleteNFTProjectsInput';
import { DeleteNFTProjectsPayload } from '../../../types/Models/NFTProjects/DeleteNFTProjects/DeleteNFTsPayload';
import { CancelSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CancelSingleOrBulkMintTransaction/CancelSingleOrBulkMintTransactionInput';
import { CancelSingleOrBulkMintTransactionPayload } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CancelSingleOrBulkMintTransaction/CancelSingleOrBulkMintTransactionPayload';
import { CreateSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';
import { CreateSingleOrBulkBurnTransactionPayload } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionPayload';
import { SubmitSingleOrBulkMintTransactionInput } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';
import { SubmitSingleOrBulkMintTransactionPayload } from '../../../types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionPayload';
import { UpdateNFTProjectInput } from '../../../types/Models/NFTProjects/UpdateNFTProject/UpdateNFTProjectInput';
import { UpdateNFTProjectPayload } from '../../../types/Models/NFTProjects/UpdateNFTProject/UpdateNFTProjectPayload';
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
    graphQLClient.setHeaders(await getGraphQLHeaders());
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
    graphQLClient.setHeaders(await getGraphQLHeaders());
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
