import { SaturnError } from '../../../../../Classes/saturnError';

export interface SubmitRoyaltyMintTransactionPayload {
    transactionId?: string;
    error?: SaturnError;
}
