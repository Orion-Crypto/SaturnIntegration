import { CreateBuyDirectMintTransactionInput } from '../../types/Models/NFTProjects/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionInput';
import { SubmitBuyDirectMintTransactionInput } from '../../types/Models/NFTProjects/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';
import { CreateRoyaltyMintTransactionInput } from '../../types/Models/NFTProjects/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';
import { UpdateNFTProjectInput } from '../../types/Models/NFTProjects/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';
import { CreateSingleOrBulkMintTransactionInput } from '../../types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';
import { SubmitSingleOrBulkMintTransactionInput } from '../../types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';
import { SubmitRoyaltyMintTransactionInput } from '../../types/Models/NFTProjects/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionInput';
import { saturnAPI } from '../api';

//---------------------------------------------------------------------------------------------------//
// NFTProject Add, Update, Delete Functions
//---------------------------------------------------------------------------------------------------//
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

export const updateNFTProject = async (input: UpdateNFTProjectInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.update()}`;
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

//---------------------------------------------------------------------------------------------------//
// Royalty Mint Functions
//---------------------------------------------------------------------------------------------------//
export const createRoyaltyMintTransaction = async (input: CreateRoyaltyMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.createRoyaltyMintTransaction()}`;
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

export const submitRoyaltyMintTransaction = async (input: SubmitRoyaltyMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.submitRoyaltyMintTransaction()}`;
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
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Single Or Bulk Mint Functions
//---------------------------------------------------------------------------------------------------//

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
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Buy Direct Mint Functions
//---------------------------------------------------------------------------------------------------//
export const createBuyDirectMintTransaction = async (input: CreateBuyDirectMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.createBuyDirectMintTransaction()}`;
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

export const submitBuyDirectMintTransaction = async (input: SubmitBuyDirectMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.submitBuyDirectMintTransaction()}`;
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
//---------------------------------------------------------------------------------------------------//
