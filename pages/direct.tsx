import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { addNFT, updateNFT } from '../src/api/Requests/nft';
import {
    addNFTProject,
    createBuyDirectMintTransaction,
    createRoyaltyMintTransaction,
    submitBuyDirectMintTransaction,
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
import { CreateBuyDirectMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/BuyDirectMint/CreateBuyDirectMintTransaction/CreateBuyDirectMintTransactionInput';
import { SubmitBuyDirectMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/BuyDirectMint/SubmitBuyDirectMintTransaction/SubmitBuyDirectMintTransactionInput';
import { CreateRoyaltyMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/CreateRoyaltyMintTransaction/CreateRoyaltyMintTransactionInput';
import { UpdateNFTProjectInput } from '../src/types/Models/NFTProject/GraphQL/CRUDData/UpdateNFTProject/UpdateNFTProjectInput';
import { SubmitRoyaltyMintTransactionInput } from '../src/types/Models/NFTProject/GraphQL/SubmitRoyaltyMintTransaction/SubmitRoyaltyMintTransactionInput';

const DirectPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const mint = async () => {
        setIsLoading(true);
        await mintDirectNFT();
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

const mintDirectNFT = async () => {
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
            nftId: nft?.id,
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

        // Only need to create / submit royalty mint transaction once per project to start the mint
        // If you already have a royalty token from a previous, or you don't want a royalty token. Make sure the NFT Project update did not
        // include royalty data

        // 5) Create Royalty Mint
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

        // 6) Create a Mint Transaction for the NFT
        const createBuyDirectMintTransactionInput: CreateBuyDirectMintTransactionInput = {
            nftProjectId: nftProject?.id,
            nftIds: [nft?.id],
            paymentAddress: address,
        };
        const createBuyDirectMintPayload = await createBuyDirectMintTransaction(createBuyDirectMintTransactionInput);
        const hexTransaction = createBuyDirectMintPayload.hexTransaction;
        if (!hexTransaction) {
            console.log('Hex Transaction is null');
        }

        // 7) Reconstruct and sign tx
        const reconstructedTx = Loader.Cardano.Transaction.from_bytes(fromHex(hexTransaction));
        let transactionWitnessSet = reconstructedTx.witness_set();
        if (!transactionWitnessSet) {
            transactionWitnessSet = Loader.Cardano.TransactionWitnessSet.new();
        }
        let txVKeyWitnesses = await signTx(reconstructedTx);
        txVKeyWitnesses = Loader.Cardano.TransactionWitnessSet.from_bytes(fromHex(txVKeyWitnesses));
        transactionWitnessSet.set_vkeys(txVKeyWitnesses.vkeys());

        const signedTx = Loader.Cardano.Transaction.new(reconstructedTx.body(), transactionWitnessSet, reconstructedTx.auxiliary_data());
        const signedBytes = signedTx.to_bytes();
        const signedHex = toHex(signedBytes);

        // 8) Submit Mint Transaction for the NFT
        const submitInput: SubmitBuyDirectMintTransactionInput = {
            nftProjectId: nftProject?.id,
            paymentAddress: address,
            hexTransaction: signedHex,
        };

        const submitBuyDirectMintTransactionPayload = await submitBuyDirectMintTransaction(submitInput);
        const transactionId = submitBuyDirectMintTransactionPayload?.transactionId;
        if (!transactionId) {
            console.log('Transaction Id is null');
            return;
        }

        console.log('Congratulations! You have successfully minting a test Direct NFT Mint with the Saturn API! Tx Id:', transactionId);
    } catch (error) {
        console.error(error);
    }
};

export default DirectPage;
