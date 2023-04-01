export interface DeleteNFTsInput {
    nftProjectId: string;
    nfts?: DeleteNFT[];
}

export interface DeleteNFT {
    nftId?: string;
}
