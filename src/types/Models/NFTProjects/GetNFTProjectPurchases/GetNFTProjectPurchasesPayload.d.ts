import { SaturnError } from '../../../../../Classes/saturnError';

export interface GetNFTProjectPurchasesPayload {
    nftProjectId?: string;

    // Basic Data
    address?: string;
    purchasedNFTs?: PurchaseNFT[];

    // Error Data
    error?: SaturnError;
}

export interface PurchaseNFT {
    name?: string;
    image?: string;
}
