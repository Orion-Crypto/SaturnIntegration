import { NextApiRequest, NextApiResponse } from 'next';
import { mutateDeleteNFTs } from '../../../src/api/GraphQL/NFT/mutation';
import { DeleteNFTsInput } from '../../../src/types/Models/NFT/DeleteNFTs/DeleteNFTsInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: DeleteNFTsInput = JSON.parse(body);
        const nft = await mutateDeleteNFTs(input);
        res.status(200).json(nft);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
