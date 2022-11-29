import { SaturnError } from '../../../../../Classes/saturnError';

export interface CancelBuyMintTransactionPayload {
    nftProjectId?: string;
    error?: SaturnError;
}
