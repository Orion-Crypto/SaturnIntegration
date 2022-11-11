export interface UpdateNFTInput {
    id: string;
    assetName?: string;
    name?: string;
    files?: NFTFileData[];
    jsonProperties?: string;
}
