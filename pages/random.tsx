import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { mutateCreateBuyRandomMintTransaction } from '../src/api/GraphQL/NFTProject/mutation';
import { addNFT, updateNFT } from '../src/api/Requests/nft';
import {
    addNFTProject,
    createBuyDirectMintTransaction,
    createBuyRandomMintTransaction,
    createRoyaltyMintTransaction,
    startMint,
    submitBuyDirectMintTransaction,
    submitBuyRandomMintTransaction,
    submitRoyaltyMintTransaction,
    updateNFTProject,
} from '../src/api/Requests/nftproject';
import Loader from '../src/cardano/loader';
import { fromHex, toHex } from '../src/cardano/serialization';
import { connectWallet, getAddress, signTx } from '../src/cardano/wallet';
import { Spinner } from '../src/components/Elements/Spinner';
import { AddNFTsInput } from '../src/types/Models/NFT/GraphQL/AddNFTs/AddNFTsInput';
import { UpdateNFTInput } from '../src/types/Models/NFT/GraphQL/UpdateNFTs/UpdateNFTInput';
import { LocalMintType } from '../src/types/Models/NFTProject/Enums/MintType';
import { CreateBuyRandomMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/BuyRandomMint/CreateBuyRandomMintTransaction/CreateBuyRandomMintTransactionInput';
import { SubmitBuyRandomMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/BuyRandomMint/SubmitBuyRandomMintTransaction/SubmitBuyRandomMintTransactionInput';
import { CreateRoyaltyMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';
import { StartMintInput } from '../src/types/Models/NFTProject/GraphQL/CRUDData/StartMint/StartMintInput';
import { UpdateNFTProjectInput } from '../src/types/Models/NFTProject/GraphQL/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';
import { SubmitRoyaltyMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionInput';

const RandomPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const mint = async () => {
        setIsLoading(true);
        await mintRandomNFT();
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
                <div className="flex w-104 items-center justify-center">
                    {isLoading ? <Spinner /> : 'Create And Mint A Direct NFT With Saturn'}
                </div>
            </div>
        </div>
    );
};

const mintRandomNFT = async () => {
    try {
        await Loader.load();

        // Connect wallet (nami as a test)
        await connectWallet();
        const address = await getAddress();

        // 1) Create a new NFT Project
        const nftProject = await addNFTProject();

        // 2) Update the new NFT Project to support direct buy
        const updateNFTProjectInput: UpdateNFTProjectInput = {
            nftProjectId: nftProject?.id,
            mintType: LocalMintType.Buy,
        };
        const updateNFTProjectPayload = await updateNFTProject(updateNFTProjectInput);

        // 3) Add an NFT to the new NFT Project
        const addNFTInput: AddNFTsInput = {
            nftProjectId: updateNFTProjectPayload?.id,
            count: 1,
        };
        const nfts = await addNFT(addNFTInput);
        const nft = nfts?.[0];

        // 4) Update the NFT with data
        const individualNFTPrice = {
            adaPrice: 6,
            allowAdaPayment: true,
            isMainPrice: true,
        };
        const jsonProperties = {
            'minting-platform': 'https://saturnnft.io/',
        };
        const updateNFTInput: UpdateNFTInput = {
            id: nft?.id,
            assetName: 'SaturnAPITest1',
            name: 'Saturn API Test #1',
            files: [
                {
                    name: 'Saturn API Test',
                    mediaType: 'image/png',
                    src: 'ipfs://QmXFjiN3McTAxxugMCkGW21SAvEjQ6vpV5LrQCzuGo4YiJ',
                },
            ],
            jsonProperties: JSON.stringify(jsonProperties),
            individualPrice: individualNFTPrice,
        };
        await updateNFT(updateNFTInput);

        // 5) Create and submit the royalty transaction
        const createRoyaltyMintTransactionInput: CreateRoyaltyMintTransactionInput = {
            nftProjectId: nftProject.id,
        };

        // Since we have not set any royalties, ignore the output
        await createRoyaltyMintTransaction(createRoyaltyMintTransactionInput);

        const submitRoyaltyMintTransactionInput: SubmitRoyaltyMintTransactionInput = {
            nftProjectId: nftProject.id,
            hexTransaction: null,
            mintEnd: null,
        };
        await submitRoyaltyMintTransaction(submitRoyaltyMintTransactionInput);

        const inputStartMintInput: StartMintInput = {
            nftProjectId: nftProject.id,
            mintEnd: null,
        };

        // 6) Start the Mint
        await startMint(inputStartMintInput);

        // The following 3 steps are all that is needed on a mint page, the rest is just setting up the NFT Project
        // Setting up the NFT Project can be done in https://saturnnft.io/

        // 7) Create a Mint Transaction for the NFT
        const createBuyRandomMintTransactionInput: CreateBuyRandomMintTransactionInput = {
            nftProjectId: nftProject?.id,
            paymentAddress: address,
            count: 1,
            paymentToken: 'ada',
            mintingPassword: '',
        };
        const createBuyRandomMintPayload = await createBuyRandomMintTransaction(createBuyRandomMintTransactionInput);
        const hexTransaction = createBuyRandomMintPayload.hexTransaction;
        if (!hexTransaction) {
            console.log('Hex Transaction is null');
        }

        // 8) Reconstruct and sign tx
        const reconstructedTx = Loader.Cardano.Transaction.from_bytes(fromHex(hexTransaction));
        const transactionWitnessSet = Loader.Cardano.TransactionWitnessSet.new();
        let txVKeyWitnesses = await signTx(reconstructedTx);
        txVKeyWitnesses = Loader.Cardano.TransactionWitnessSet.from_bytes(fromHex(txVKeyWitnesses));
        transactionWitnessSet.set_vkeys(txVKeyWitnesses.vkeys());

        const signedTx = Loader.Cardano.Transaction.new(reconstructedTx.body(), transactionWitnessSet, reconstructedTx.auxiliary_data());
        const signedBytes = signedTx.to_bytes();
        const signedHex = toHex(signedBytes);

        // 9) Submit Mint Transaction for the NFT
        const submitInput: SubmitBuyRandomMintTransactionInput = {
            nftProjectId: nftProject?.id,
            paymentAddress: address,
            hexTransaction: signedHex,
        };

        const submitBuyRandomMintTransactionPayload = await submitBuyRandomMintTransaction(submitInput);
        const transactionId = submitBuyRandomMintTransactionPayload?.transactionId;
        if (!transactionId) {
            console.log('Transaction Id is null');
            return;
        }

        console.log('Congratulations! You have successfully minting a test Direct NFT Mint with the Saturn API! Tx Id:', transactionId);
    } catch (error) {
        console.error(error);
    }
};

export default RandomPage;
