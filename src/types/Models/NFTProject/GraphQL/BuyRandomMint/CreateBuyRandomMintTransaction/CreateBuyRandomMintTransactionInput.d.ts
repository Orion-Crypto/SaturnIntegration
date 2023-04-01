export interface CreateBuyRandomMintTransactionInput {
    nftProjectId: string;
    paymentAddress: string;
    count: number;
    paymentToken?: string | null;
    gReCaptchaToken?: string;
    optionalUTXOs?: string[];
    mintingPassword?: string;
    mintingPassword2?: string;
}
