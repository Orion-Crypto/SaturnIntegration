import { SaturnError } from '../../../../../Classes/saturnError';

export interface StartMintPayload {
    transactionId?: string;
    error?: SaturnError;
}
