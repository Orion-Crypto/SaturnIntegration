import Loader from './loader';
import { fromHex, toHex } from './serialization';

let api: any;

export const connectWallet = async () => {
    // @ts-ignore
    const wallet = window.cardano.nami;
    api = await wallet.enable();
};

export const getAddress = async () => {
    if (!api) return null;
    if (!Loader || !Loader.Cardano) return null;

    const hexAddresses = await api.getUsedAddresses();
    const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
    const address = addressObject?.to_bech32();
    return address;
};

export const signTx = async (tx: any) => {
    if (!api) return null;

    const signedTx = await api.signTx(toHex(tx.to_bytes()), true);
    return signedTx;
};
