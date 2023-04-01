import { NextApiRequest, NextApiResponse } from 'next';
import { mutateSubmitBuyDirectMintTransaction, mutateSubmitRoyaltyMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { SubmitBuyDirectMintTransactionInput } from '../../../src/types/Models/NFTProject/GraphQL/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: SubmitBuyDirectMintTransactionInput = JSON.parse(body);
        const submitRoyaltyMintTransactionPayload = await mutateSubmitRoyaltyMintTransaction(input);
        res.status(200).json(submitRoyaltyMintTransactionPayload);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
