import { CreateBuyDirectMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionInput';
import { SubmitBuyDirectMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';
import { CreateBuyRandomMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/BuyRandomMint/CreateBuyRandomMintTransaction/CreateBuyRandomMintTransactionInput';
import { SubmitBuyRandomMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/BuyRandomMint/SubmitBuyRandomMintTransaction/SubmitBuyRandomMintTransactionInput';
import { CreateRoyaltyMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';
import { StartMintInput } from '../../types/Models/NFTProject/GraphQL/CRUDData/StartMint/StartMintInput';
import { UpdateNFTProjectInput } from '../../types/Models/NFTProject/GraphQL/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';
import { CreateSingleOrBulkMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';
import { SubmitSingleOrBulkMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';
import { SubmitRoyaltyMintTransactionInput } from '../../types/Models/NFTProject/GraphQL/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionInput';
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

//---------------------------------------------------------------------------------------------------//
// Start Mint Functions
//---------------------------------------------------------------------------------------------------//
export const startMint = async (input: StartMintInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.startMint()}`;
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
// Buy Random Mint Functions
//---------------------------------------------------------------------------------------------------//
export const createBuyRandomMintTransaction = async (input: CreateBuyRandomMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.createBuyRandomMintTransaction()}`;
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

export const submitBuyRandomMintTransaction = async (input: SubmitBuyRandomMintTransactionInput) => {
    try {
        const url = `${saturnAPI.baseURL}${saturnAPI.endpoints.nftproject.submitBuyRandomMintTransaction()}`;
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
