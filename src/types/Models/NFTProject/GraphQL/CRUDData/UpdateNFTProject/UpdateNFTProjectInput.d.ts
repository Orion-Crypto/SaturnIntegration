export interface UpdateNFTProjectInput {
    // Basic Data
    nftProjectId?: string;
    name?: string;

    // Price Data
    prices?: [UpdateNFTProjectPrice];

    // Mint Data
    mintEnd?: Date | null;
    lockAfterDatetime?: Date | null;

    // Royalties
    royaltyAddress?: string | null;
    royaltyPercent?: number;

    // NFT Project Mint
    mintType?: number;
    maxPerTransaction?: number;
    maxPerWallet?: number;

    // Partner
    platformFeePercent?: number;
}

export interface UpdateNFTProjectPrice {
    adaPrice?: number;
    allowAdaPayment?: boolean;
    tokenPrice?: number | null;
    token?: string | null;
    allowTokenPayment?: boolean;
    isMainPrice?: boolean;
}
