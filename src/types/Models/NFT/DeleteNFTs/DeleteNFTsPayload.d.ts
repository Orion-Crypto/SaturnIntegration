import { SaturnError } from '../../../../Classes/saturnError';

export interface DeleteNFTsPayload {
    nftProject: any;
    nfts: any;
    error: SaturnError;
}
