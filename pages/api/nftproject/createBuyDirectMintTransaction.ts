import { NextApiRequest, NextApiResponse } from 'next';
import { mutateCreateBuyDirectMintTransaction, mutateCreateSingleOrBulkMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { CreateBuyDirectMintTransactionInput } from '../../../src/types/Models/NFTProjects/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionInput';
import { CreateSingleOrBulkMintTransactionInput } from '../../../src/types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: CreateBuyDirectMintTransactionInput = JSON.parse(body);
        const createBuyDirectMintTransactionPayload = await mutateCreateBuyDirectMintTransaction(input);
        res.status(200).json(createBuyDirectMintTransactionPayload);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
