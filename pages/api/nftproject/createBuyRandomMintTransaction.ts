import { NextApiRequest, NextApiResponse } from 'next';
import { mutateCreateBuyRandomMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { CreateBuyRandomMintTransactionInput } from '../../../src/types/Models/NFTProject/GraphQL/BuyRandomMint/CreateBuyRandomMintTransaction/CreateBuyRandomMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: CreateBuyRandomMintTransactionInput = JSON.parse(body);
        const transaction = await mutateCreateBuyRandomMintTransaction(input);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
