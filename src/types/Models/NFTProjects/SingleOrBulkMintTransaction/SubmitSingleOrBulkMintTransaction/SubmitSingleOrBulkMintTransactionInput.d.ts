export interface SubmitSingleOrBulkMintTransactionInput {
    nftProjectId: string;
    nftIds: string[];
    paymentAddress: string;
    hexTransaction: string;
}
