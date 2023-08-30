export interface UpdateNFTInput {
    nftId: string;
    assetName?: string;
    name?: string;
    files?: NFTFileData[];
    jsonProperties?: string;
    individualPrice?: NFTPriceData;
}
