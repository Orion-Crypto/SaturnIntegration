import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { saturnAPI } from '../src/api/api';
import { addNFT } from '../src/api/Requests/nft';
import { addNFTProject } from '../src/api/Requests/nftproject';
import { Spinner } from '../src/components/Elements/Spinner';
import { AddNFTsInput } from '../src/types/Models/NFT/AddNFTs/AddNFTsInput';

const IndexPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const mint = async () => {
        setIsLoading(true);
        await mintNFT();
        setIsLoading(false);
    };
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div
                onClick={mint}
                className={clsx(
                    'flex h-16 cursor-pointer select-none items-center justify-center gap-2 rounded-xl bg-blue-800 px-2 text-xl font-bold text-white drop-shadow-black-sharp',
                    'hover:bg-blue-600',
                    'active:bg-blue-500'
                )}
            >
                <div className="">
                    <Image src={'/images/Logo.png'} alt={'Saturn Logo'} width={48} height={48} />
                </div>
                <div className="flex w-104 items-center justify-center">{isLoading ? <Spinner /> : 'Create And Mint Test NFT With Saturn'}</div>
            </div>
        </div>
    );
};

const mintNFT = async () => {
    try {
        // 1) Create a new NFT Project
        const nftProject = await addNFTProject();

        // 2) Add an NFT to the new NFT Project
        const addNFTInput: AddNFTsInput = {
            nftProjectId: nftProject?.id,
            count: 1,
        };
        const nft = await addNFT(addNFTInput);

        // 3) Update the NFT with data

        // 4) Mint the NFT
        console.log('nftProject', nftProject);
        console.log('nft', nft);
    } catch (error) {
        console.error(error);
    }
};

const buyMintNFT = async () => {
    try {
        console.log('Mega Muk');
    } catch (error) {
        console.error(error);
    }
};

export default IndexPage;
