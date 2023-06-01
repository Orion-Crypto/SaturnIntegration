import { getNetwork } from '../cardano/utils';
import { Network } from '../types/Enums/Blockchain/Network';

export const getTransactionLink = (transactionId: string) => {
    if (!transactionId) return null;

    const network = getNetwork();
    let url = 'cardanoscan.io';
    if (network === Network.Preprod) {
        url = 'testnet.cardanoscan.io';
    }

    const link = `https://${url}/transaction/${transactionId}`;
    return link;
};
