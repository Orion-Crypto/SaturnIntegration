import { Network } from '../types/Enums/Blockchain/Network';

export const adaToLovelace = 1000000;
export const lovelaceToAda = 0.000001;
export const getNetwork = () => {
    const networkString = process.env.NEXT_PUBLIC_CARDANO_NETWORK;
    const envNetwork = networkString === 'mainnet' ? Network.Mainnet : Network.Preprod;
    return envNetwork;
};

export const blobPolicyId = () => {
    let blobPolicyId = '4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318';
    if (getNetwork() === Network.Preprod) {
        // This is the SundaeSwap Mint test token
        blobPolicyId = '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522';
    }
    return blobPolicyId;
};
