import { SaturnError } from '../../../../../Classes/saturnError';

export interface CreateBuyRandomMintTransactionPayload {
    hexTransaction?: string;
    error?: SaturnError;
}
