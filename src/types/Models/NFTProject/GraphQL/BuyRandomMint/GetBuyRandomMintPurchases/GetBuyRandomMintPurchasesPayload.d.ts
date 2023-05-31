import { SaturnError } from '../../../../../Classes/saturnError';

export interface GetBuyRandomMintPurchasesPayload {
    nftProjectId?: string;

    // Basic Data
    address?: string;
    purchasedNFTs?: any;

    // Error Data
    error?: SaturnError;
}
