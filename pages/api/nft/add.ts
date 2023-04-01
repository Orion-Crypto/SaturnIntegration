import { NextApiRequest, NextApiResponse } from 'next';
import { mutateAddNFTs } from '../../../src/api/GraphQL/NFT/mutation';
import { AddNFTsInput } from '../../../src/types/Models/NFT/GraphQL/AddNFTs/AddNFTsInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: AddNFTsInput = JSON.parse(body);
        const nfts = await mutateAddNFTs(input);
        res.status(200).json(nfts);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
