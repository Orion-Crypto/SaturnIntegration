import { SaturnError } from '../../../../Classes/saturnError';

export interface UploadNFTImagesPayload {
    nftProject?: any;
    link?: string;
    error?: SaturnError;
}
