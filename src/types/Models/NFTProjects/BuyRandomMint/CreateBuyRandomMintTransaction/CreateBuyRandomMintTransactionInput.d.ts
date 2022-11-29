export interface CreateBuyMintTransactionInput {
    nftProjectId: string;
    paymentAddress: string;
    count: number;
    paymentToken?: string | null;
    gReCaptchaToken?: string;
}
