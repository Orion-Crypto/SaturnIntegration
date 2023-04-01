//---------------------------------------------------------------------------------------------------//
// Download Functions
//---------------------------------------------------------------------------------------------------//

import { gql } from 'graphql-request';
import { GetPublicNFTImagesInput } from '../../../types/Models/NFT/GraphQL/GetPublicNFTImages/GetPublicNFTImagesInput';
import { getGraphQLHeaders, graphQLClient } from '../../api';

export const queryPublicNFTImages = async (nftProjectId: string) => {
    if (!nftProjectId) return null;

    graphQLClient.setHeaders(await getGraphQLHeaders());
    const getPublicNFTImagesInput: GetPublicNFTImagesInput = { nftProjectId: nftProjectId };
    const input = { input: getPublicNFTImagesInput };
    const response = await graphQLClient.request(
        gql`
            query PublicNFTImages($input: GetPublicNFTImagesInput!) {
                publicNFTImages(input: $input) {
                    images
                    error {
                        message
                    }
                }
            }
        `,
        input
    );
    const images = response?.publicNFTImages?.images || {};
    return images;
};
//---------------------------------------------------------------------------------------------------//
