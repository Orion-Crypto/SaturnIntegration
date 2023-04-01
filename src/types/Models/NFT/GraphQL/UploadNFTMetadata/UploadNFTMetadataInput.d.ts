export interface UploadNFTMetadataInput {
    nftProjectId: string;
    beginIndex: number;
    endIndex: number;
    nftMetadatas?: UploadNFTMetadata[];
}

export interface UploadNFTMetadata {
    index?: number;
    metadata?: File;
}
