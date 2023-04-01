export interface SubmitRoyaltyMintTransactionInput {
    nftProjectId: string;
    hexTransaction: string | null;
    mintEnd?: Date | null;
}
