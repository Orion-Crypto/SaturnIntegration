import { SaturnError } from '../../../../../Classes/saturnError';

export interface SubmitBuyMintTransactionPayload {
    transactionId?: string;
    error?: SaturnError;
}
