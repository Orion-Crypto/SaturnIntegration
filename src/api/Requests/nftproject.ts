import { saturnAPI } from '../api';

export const addNFTProject = async () => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.add()}`;
        const response = await fetch(url, {
            method: 'POST',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
