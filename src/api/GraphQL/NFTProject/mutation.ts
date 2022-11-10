import { gql } from 'graphql-request';
import { AddNFTProjectsPayload } from '../../../types/Models/NFTProjects/AddNFTProjects/AddNFTProjectsPayload';
import { DeleteNFTProjectsInput } from '../../../types/Models/NFTProjects/DeleteNFTProjects/DeleteNFTProjectsInput';
import { DeleteNFTProjectsPayload } from '../../../types/Models/NFTProjects/DeleteNFTProjects/DeleteNFTsPayload';
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
