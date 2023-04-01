import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { mutateAddNFTs, mutateDeleteAllNFTs, mutateDeleteNFTs } from '../../api/GraphQL/NFT/mutation';
import { graphQLNFTs, queryNFT, queryNFTs, queryPublicNFT, queryPublicNFTImages, queryPublicNFTs } from '../../api/GraphQL/NFT/query';
import { queryClient } from '../../state';
import { GraphQLParameters } from '../../types/GraphQL/GraphQLParameters';
import { SearchFunction } from '../../types/GraphQL/Search';
import { AddNFTsInput } from '../../types/Models/NFT/GraphQL/AddNFTs/AddNFTsInput';
import { AddNFTsPayload } from '../../types/Models/NFT/GraphQL/AddNFTs/AddNFTsPayload';
import { DeleteAllNFTsInput } from '../../types/Models/NFT/GraphQL/DeleteAllNFTs/DeleteAllNFTsInput';
import { DeleteNFTsInput } from '../../types/Models/NFT/GraphQL/DeleteNFTs/DeleteNFTsInput';

export const BASE_NFT_KEY = 'nft';

//---------------------------------------------------------------------------//
// Get Public NFT Functions
//---------------------------------------------------------------------------//
export const useGetPublicNFTImages = (id: string, parameters: any) =>
    useQuery([BASE_NFT_KEY, 'detail', id, 'public', 'images'], async () => await queryPublicNFTImages(id), parameters);
//---------------------------------------------------------------------------//
