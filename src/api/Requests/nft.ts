import { saturnAPI } from '../api';

export const addNFT = async () => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nft.add()}`;
        const response = await fetch(url);
        console.log('response', response);
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
