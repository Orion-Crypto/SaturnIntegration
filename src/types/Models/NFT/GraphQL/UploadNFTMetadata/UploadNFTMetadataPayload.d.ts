import { SaturnError } from '../../../../Classes/saturnError';

export interface UploadNFTMetadataPayload {
    nftProject?: any;
    link?: string;
    error?: SaturnError;
}
