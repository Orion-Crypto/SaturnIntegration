export interface UpdateNFTInput {
    id: string;
    assetName?: string;
    name?: string;
    files?: UpdateNFTFile[];
    jsonProperties?: string;
}

export interface UpdateNFTFileInput {
    id?: string;
    name?: string;
    mediaType?: string;
    src?: string;
    jsonProperties?: string;
    fileId?: number;
}
