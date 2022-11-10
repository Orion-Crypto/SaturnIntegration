export interface UpdateNFTProjectInput {
    // Basic Data
    nftProjectId?: string;
    name?: string;

    // Mint Data
    price?: number;
    mintEnd?: Date | null;
    lockAfterDatetime?: Date | null;

    // Royalties
    royaltyAddress?: string | null;
    royaltyPercent?: number;

    // NFT Project Mint
    maxPerTransaction?: number;
    maxPerWallet?: number;

    // Partner
    platformFeePercent?: number;
}
