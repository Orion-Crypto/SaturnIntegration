import { NextApiRequest, NextApiResponse } from 'next';
import { mutateSubmitBuyRandomMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { SubmitBuyRandomMintTransactionInput } from '../../../src/types/Models/NFTProject/GraphQL/BuyRandomMint/SubmitBuyRandomMintTransaction/SubmitBuyRandomMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: SubmitBuyRandomMintTransactionInput = JSON.parse(body);
        const transaction = await mutateSubmitBuyRandomMintTransaction(input);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
