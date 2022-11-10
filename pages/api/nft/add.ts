import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    console.log(body);
    res.status(200).json({ blob: 'test' });
};

export default handler;
