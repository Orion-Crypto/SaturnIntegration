export interface CreateBuyDirectMintTransactionInput {
    nftProjectId: string;
    paymentAddress: string;
    nftIds: string[];
    paymentToken?: string | null;
    gReCaptchaToken?: string;
}
