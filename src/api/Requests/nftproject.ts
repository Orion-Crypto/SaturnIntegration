import { CreateSingleOrBulkMintTransactionInput } from '../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';
import { SubmitSingleOrBulkMintTransactionInput } from '../../types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';
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

export const createSingleOrBulkMintTransaction = async (input: CreateSingleOrBulkMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.createSingleOrBulkMintTransaction()}`;
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

export const submitSingleOrBulkMintTransaction = async (input: SubmitSingleOrBulkMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.submitSingleOrBulkMintTransaction()}`;
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
