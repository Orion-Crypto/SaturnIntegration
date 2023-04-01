import { SaturnError } from '../../../../../Classes/saturnError';

export interface CancelBuyDirectMintTransactionPayload {
    nftProjectId?: string;
    error?: SaturnError;
}
