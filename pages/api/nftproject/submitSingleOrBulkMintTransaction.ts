import { NextApiRequest, NextApiResponse } from 'next';
import { mutateSubmitSingleOrBulkMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { SubmitSingleOrBulkMintTransactionInput } from '../../../src/types/Models/NFTProjects/SingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransaction/SubmitSingleOrBulkMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: SubmitSingleOrBulkMintTransactionInput = JSON.parse(body);
        const submitSingleOrBulkMintTransactionPayload = await mutateSubmitSingleOrBulkMintTransaction(input);
        res.status(200).json(submitSingleOrBulkMintTransactionPayload);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
