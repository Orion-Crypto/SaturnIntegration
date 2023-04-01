import { NextApiRequest, NextApiResponse } from 'next';
import { mutateCreateRoyaltyMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { CreateRoyaltyMintTransactionInput } from '../../../src/types/Models/NFTProject/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: CreateRoyaltyMintTransactionInput = JSON.parse(body);
        const createRoyaltyMintTransactionPayload = await mutateCreateRoyaltyMintTransaction(input);
        res.status(200).json(createRoyaltyMintTransactionPayload);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
