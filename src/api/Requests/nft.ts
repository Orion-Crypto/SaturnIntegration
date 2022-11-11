import { AddNFTsInput } from '../../types/Models/NFT/AddNFTs/AddNFTsInput';
import { DeleteNFTsInput } from '../../types/Models/NFT/DeleteNFTs/DeleteNFTsInput';
import { UpdateNFTInput } from '../../types/Models/NFT/UpdateNFTs/UpdateNFTInput';
import { saturnAPI } from '../api';

export const addNFT = async (input: AddNFTsInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nft.add()}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(input),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateNFT = async (input: UpdateNFTInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nft.update()}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(input),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteNFTs = async (input: DeleteNFTsInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nft.delete()}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(input),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
