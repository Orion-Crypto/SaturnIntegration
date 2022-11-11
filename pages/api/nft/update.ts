import { NextApiRequest, NextApiResponse } from 'next';
import { mutateUpdateNFT } from '../../../src/api/GraphQL/NFT/mutation';
import { UpdateNFTInput } from '../../../src/types/Models/NFT/UpdateNFTs/UpdateNFTInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: UpdateNFTInput = JSON.parse(body);
        const nft = await mutateUpdateNFT(input);
        res.status(200).json(nft);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
