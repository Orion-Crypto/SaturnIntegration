import { NextApiRequest, NextApiResponse } from 'next';
import { mutateCreateSingleOrBulkMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { CreateSingleOrBulkMintTransactionInput } from '../../../src/types/Models/NFTProject/GraphQL/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: CreateSingleOrBulkMintTransactionInput = JSON.parse(body);
        const createSingleOrBulkMintTransactionPayload = await mutateCreateSingleOrBulkMintTransaction(input);
        res.status(200).json(createSingleOrBulkMintTransactionPayload);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
