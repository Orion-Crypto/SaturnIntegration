import { SaturnError } from '../../../../../Classes/saturnError';

export interface SubmitBuyDirectMintTransactionPayload {
    transactionId?: string;
    error?: SaturnError;
}
