import { SaturnError } from '../../../../../Classes/saturnError';

export interface CreateSingleOrBulkBurnTransactionPayload {
    hexTransaction?: string;
    error?: SaturnError;
}
