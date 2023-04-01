import { SaturnError } from '../../../../../Classes/saturnError';

export interface GetBuyRandomMintPaymentPayload {
    id?: string;

    // Basic Data
    name?: string;
    blockchain: number;
    network: number;

    // NFT Data
    policyId?: string;
    reservedNFTs?: number;
    completedNFTs?: number;
    totalNFTs?: number;

    // Mint Data
    price?: number;
    maxPerTx?: number;
    maxPerWallet?: number;
    mintStart?: Date | null;
    mintEnd?: Date | null;
    lockAfterDatetime?: Date | null;
    isActive?: boolean;
    isFreeMint?: boolean;

    // Error Data
    error?: SaturnError;
}
