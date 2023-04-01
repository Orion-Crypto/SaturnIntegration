import { NextApiRequest, NextApiResponse } from 'next';
import { mutateAddNFTProjects, mutateUpdateNFTProject } from '../../../src/api/GraphQL/NFTProject/mutation';
import { UpdateNFTProjectInput } from '../../../src/types/Models/NFTProject/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        const input: UpdateNFTProjectInput = JSON.parse(body);
        const nftProject = await mutateUpdateNFTProject(input);
        res.status(200).json(nftProject);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export default handler;
