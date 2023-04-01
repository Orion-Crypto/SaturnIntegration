import { SaturnError } from '../../../../../Classes/saturnError';

export interface CreateBuyDirectMintTransactionPayload {
    hexTransaction?: string;
    error?: SaturnError;
}
