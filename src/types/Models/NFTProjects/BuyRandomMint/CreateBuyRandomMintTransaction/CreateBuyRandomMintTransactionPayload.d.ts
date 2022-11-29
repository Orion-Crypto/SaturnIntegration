import { SaturnError } from '../../../../../Classes/saturnError';

export interface CreateBuyMintTransactionPayload {
    hexTransaction?: string;
    error?: SaturnError;
}
