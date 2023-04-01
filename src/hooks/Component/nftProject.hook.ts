import { useQuery } from '@tanstack/react-query';
import { queryBuyRandomMintPayment, queryBuyRandomMintPurchases, queryPublicNFTProject } from '../../api/GraphQL/NFTProject/query';
import { GetBuyRandomMintPurchasesInput } from '../../types/Models/NFTProject/GraphQL/BuyRandomMint/GetBuyRandomMintPurchases/GetBuyRandomMintPurchasesInput';

export const BASE_NFT_PROJECT_KEY = 'nftProject';

//---------------------------------------------------------------------------------------------------//
// Payment Hooks Functions
//---------------------------------------------------------------------------------------------------//
export const useGetNFTProjectPayment = (id: string, address: string | null, parameters: any = {}) =>
    useQuery(
        [BASE_NFT_PROJECT_KEY, 'payment', id, address],
        async () => await queryBuyRandomMintPayment({ nftProjectId: id, address: address }),
        parameters
    );

export const useGetNFTProjectPurchases = (input: GetBuyRandomMintPurchasesInput, parameters: any = {}) =>
    useQuery([BASE_NFT_PROJECT_KEY, 'purchases', input?.nftProjectId], async () => await queryBuyRandomMintPurchases(input), parameters);
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Public NFT Project Hooks and Functions
//---------------------------------------------------------------------------------------------------//
export const useGetPublicNFTProject = (id: string) =>
    useQuery([BASE_NFT_PROJECT_KEY, 'detail', id, 'public'], async () => await queryPublicNFTProject(id));
//---------------------------------------------------------------------------------------------------//
