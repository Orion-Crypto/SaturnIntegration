import { SaturnError } from '../../../../../Classes/saturnError';

export interface CreateRoyaltyMintTransactionPayload {
    hexTransaction?: string;
    error?: SaturnError;
}
