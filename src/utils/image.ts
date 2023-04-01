import { IPFSGateway } from '../types/Enums/IPFSGateway';

export const convertIPFSToHTTP = (url: string, ipfs: IPFSGateway = IPFSGateway.NFTStorage) => {
    if (!isIPFSURL(url)) return url;

    const hash = url.replace('ipfs://', '');
    let newURL = `https://nftstorage.link/ipfs/${hash}`;
    if (ipfs === IPFSGateway.NFTStorage) {
        newURL = `https://nftstorage.link/ipfs/${hash}`;
    } else if (ipfs === IPFSGateway.Blockfrost) {
        newURL = `https://ipfs.blockfrost.dev/ipfs/${hash}`;
    } else if (ipfs === IPFSGateway.Pinata) {
        newURL = `https://gateway.pinata.cloud/ipfs/${hash}`;
    } else if (ipfs === IPFSGateway.Dweb) {
        newURL = `https://dweb.link/ipfs/${hash}`;
    } else if (ipfs === IPFSGateway.CfIPFS) {
        newURL = `https://cf-ipfs.com/ipfs/${hash}`;
    } else if (ipfs === IPFSGateway.IPFSio) {
        newURL = `https://ipfs.io/ipfs/${hash}`;
    }
    return newURL;
};

export const isIPFSURL = (url: string) => {
    if (url && url.startsWith('ipfs')) return true;
    return false;
};

export const convertToBase64 = (data: string) => {
    return `data:image/png;base64,${data}`;
};

export const parseNumberFromFileName = (filename: string) => {
    try {
        let numberString = filename.match(/\d+(?=\D*$)/)?.[0];
        if (numberString === null || numberString === undefined) {
            numberString = '-1';
        }
        const number = Number(numberString);
        return number;
    } catch (error) {
        console.error(error);
        return -1;
    }
};
