export interface CreateSingleOrBulkMintTransactionInput {
    nftProjectId: string;
    nftIds: string[];
    paymentAddress: string;
    receiveAddress: string;
}
