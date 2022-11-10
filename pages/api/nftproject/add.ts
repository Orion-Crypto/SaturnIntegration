import { NextApiRequest, NextApiResponse } from 'next';
import { mutateAddNFTProjects } from '../../../src/api/GraphQL/NFTProject/mutation';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const nftProject = await mutateAddNFTProjects();
        res.status(200).json(nftProject);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
