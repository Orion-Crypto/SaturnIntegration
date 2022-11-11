import { SaturnError } from '../../../../../Classes/saturnError';

export interface SubmitSingleOrBulkMintTransactionPayload {
    transactionId?: string;
    error?: SaturnError;
}
