import { SaturnError } from '../../../../../Classes/saturnError';

export interface CancelSingleOrBulkMintTransactionPayload {
    nftProjectId?: string;
    error?: SaturnError;
}
