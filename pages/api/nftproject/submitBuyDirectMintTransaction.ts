import { NextApiRequest, NextApiResponse } from 'next';
import { mutateCreateSingleOrBulkMintTransaction, mutateSubmitBuyDirectMintTransaction } from '../../../src/api/GraphQL/NFTProject/mutation';
import { SubmitBuyDirectMintTransactionInput } from '../../../src/types/Models/NFTProjects/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';
import { CreateSingleOrBulkMintTransactionInput } from '../../../src/types/Models/NFTProjects/SingleOrBulkMintTransaction/CreateSingleOrBulkMintTransaction/CreateSingleOrBulkMintTransactionInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: SubmitBuyDirectMintTransactionInput = JSON.parse(body);
        const submitBuyDirectMintTransactionPayload = await mutateSubmitBuyDirectMintTransaction(input);
        res.status(200).json(submitBuyDirectMintTransactionPayload);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
