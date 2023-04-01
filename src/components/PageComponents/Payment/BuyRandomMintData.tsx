import { CardanoWalletType } from '@mercury-chat/react-chat';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { mutateCreateBuyRandomMintTransaction, mutateSubmitBuyRandomMintTransaction } from '../../../api/GraphQL/NFTProject/mutation';
import Loader from '../../../cardano/loader';
import { fromHex, toHex } from '../../../cardano/serialization';
import { signTx } from '../../../cardano/wallet';
import { getPaymentData, setPaymentData, setPaymentState, useGetPaymentData } from '../../../hooks/Component/mint.hook';
import { useGetPublicNFTImages } from '../../../hooks/Component/nft.hook';
import { useGetPublicNFTProject } from '../../../hooks/Component/nftProject.hook';
import { CreateBuyRandomMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/CreateBuyRandomMintTransaction/CreateBuyRandomMintTransactionInput';
import { SubmitBuyRandomMintTransactionInput } from '../../../types/Models/NFTProject/GraphQL/BuyRandomMint/SubmitBuyRandomMintTransaction/SubmitBuyRandomMintTransactionInput';
import { convertIPFSToHTTP, convertToBase64, isIPFSURL } from '../../../utils/image';
import { CheckoutImageCarousel } from '../../Elements/Carousel/CheckoutImageCarousel';
import { Spinner } from '../../Elements/Spinner';

export const BuyRandomMintData = ({ nftProjectBuyData, address }: any) => {
    const router = useRouter();
    const { nft_project_id }: any = router.query;

    const [rerender, setRerender] = useState(false);
    const [isBackHover, setIsBackHover] = useState(false);
    const onMouseEnterIcon = () => setIsBackHover(true);
    const onMouseLeaveIcon = () => setIsBackHover(false);

    const { data: nftProjectData, isLoading: isLoadingProject }: any = useGetPublicNFTProject(nft_project_id);
    const nftProject = nftProjectData?.nftProject;

    // This useState is used to prevent an immediate shift in the price appearance after tx submission
    const [lockedAdaPrice, setLockedAdaPrice] = useState(0);
    const [lockedTokenPrice, setLockedTokenPrice] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('ada');
    const { data: paymentData }: any = useGetPaymentData();

    let quantity = paymentData?.quantity ? paymentData.quantity : 0;
    if (quantity > nftProjectBuyData?.max_per_tx) {
        quantity = nftProjectBuyData?.max_per_tx;
    }

    const isMintActiveForAddress = nftProjectBuyData?.is_mint_active_for_address;
    const addressMintsAllowed = nftProjectBuyData?.address_mints_allowed;
    const isMintActiveForUser = calculateIsMintActiveForUser(isMintActiveForAddress, addressMintsAllowed, quantity);
    const setQuantity = (event: any) => setQuantityData(event, nftProjectBuyData, addressMintsAllowed, rerender, setRerender);

    const quantityIndex = quantity ? quantity : 1;

    // Price Calculations
    const prices = nftProjectBuyData?.prices;
    const price = prices?.[quantityIndex - 1];
    const adaPriceData = price?.buy_mint_ada_price;
    const tokenPricesData = price?.buy_mint_token_prices;

    // Price Ada
    const adaPrice = adaPriceData?.ada_price;
    const allowAdaPayment = adaPriceData?.allow_ada_payment;

    // Price Token
    const tokenPriceObject = tokenPricesData?.[0];
    const tokenPrice = tokenPriceObject?.token_price;
    const tokenFullName = tokenPriceObject?.token_full_name;
    const tokenName = tokenPriceObject?.token_name;
    const tokenImage = tokenPriceObject?.token_image;
    const allowTokenPayment = tokenPriceObject?.allow_token_payment;

    useEffect(() => {
        if (allowAdaPayment) {
            setSelectedCurrency('ada');
        } else if (allowTokenPayment && tokenFullName) {
            setSelectedCurrency(tokenFullName);
        }
    }, [tokenPriceObject]);

    const multipleAllowedCurrencies = allowAdaPayment && allowTokenPayment;
    const maxPerTx = nftProjectBuyData?.maxPerTx;

    const { data: images }: any = useGetPublicNFTImages(nft_project_id, {});

    const [isMinting, setIsMinting] = useState(false);
    const [viewCollectionData, setViewCollectionData] = useState(false);
    const [viewWhitelistData, setViewWhitelistData] = useState(false);

    const mintProjectNFT = useCallback(
        // useCallback is used to memoize the expensive function of executing the google Recaptcha
        async (event: any) => {
            event.preventDefault();

            const isTokenPayment: boolean = !!selectedCurrency && selectedCurrency !== 'ada';
            if (quantity <= 0) quantity = 1;
            const token = isTokenPayment ? tokenFullName : null;

            setIsMinting(true);
            setLockedAdaPrice(adaPrice);
            setLockedTokenPrice(tokenPrice);
            await mintNFT(nftProjectBuyData, address, quantity, token);
            setLockedTokenPrice(0);
            setLockedAdaPrice(0);
            setIsMinting(false);
        },
        [nftProjectBuyData, selectedCurrency, quantity]
    );

    // Calculate Token Image
    let correctedTokenImage = tokenImage;
    const isIPFS = isIPFSURL(tokenImage);
    if (!isIPFS) {
        correctedTokenImage = convertToBase64(tokenImage);
    } else {
        correctedTokenImage = convertIPFSToHTTP(tokenImage);
    }

    if (isLoadingProject) {
        return (
            <div className="h-128 flex w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }
    return (
        <>
            <div className={clsx('mb-24 flex h-full w-full flex-col items-center justify-start lg:px-64')}>
                <div className={clsx('z-10 mt-8 flex w-full flex-col items-center justify-start px-4', 'sm:mt-8')}>
                    <div className="flex w-full items-end justify-center gap-4 border-b-2 border-lightspace-200 px-2 pb-4">
                        <div className="flex-none">
                            <Link href={`/mint`} passHref>
                                <div className={clsx('mb-1 flex h-6 w-6 ', 'lg:h-full lg:w-full')}>
                                    <Image
                                        className="cursor-pointer"
                                        onMouseEnter={onMouseEnterIcon}
                                        onMouseLeave={onMouseLeaveIcon}
                                        src={
                                            isBackHover ? '/images/icons/BackArrowLightspace50.png' : '/images/icons/BackArrowLightspace200.png'
                                        }
                                        alt="Back Button"
                                        width={45}
                                        height={45}
                                        priority={true}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="grow"></div>
                        <div
                            className={clsx(
                                'flex items-center justify-center text-center text-4xl font-bold text-white',
                                'md:text-4xl',
                                'lg:text-6xl'
                            )}
                        >
                            Mint NFTs
                        </div>
                        <div className="grow"></div>
                        <div className="invisible flex-none">
                            <Link href={`/upgrade/${nft_project_id}`} passHref>
                                <div className={clsx('flex h-6 w-6', 'lg:h-full lg:w-full')}>
                                    <Image
                                        className="cursor-pointer"
                                        onMouseEnter={onMouseEnterIcon}
                                        onMouseLeave={onMouseLeaveIcon}
                                        src={
                                            isBackHover ? '/images/icons/BackArrowLightspace50.png' : '/images/icons/BackArrowLightspace200.png'
                                        }
                                        alt="Back Button"
                                        width={45}
                                        height={45}
                                        priority={true}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <CheckoutImageCarousel nftProject={nftProject} images={images} />
                    <div className="mt-1 text-center text-[0.6rem] font-bold text-purple-200">Example NFT Images</div>
                </div>
                <div className={clsx('mt-6 flex w-80 justify-center px-4 transition-all duration-300 ease-in-out', 'md:w-120', 'xl:w-144')}>
                    <div className="flex w-full flex-col rounded-xl border border-lightspace-200 bg-lightspace-500 p-6 text-white">
                        <div className={clsx('flex w-full flex-col gap-8', !multipleAllowedCurrencies ? 'lg:flex-row' : '')}>
                            <div className={clsx('w-full')}>
                                <div className="text-xl font-bold">Price:</div>
                                {multipleAllowedCurrencies && <div className="mt-3 text-center text-sm font-bold">Select Currency</div>}
                                <div className={clsx('flex flex-col gap-4', allowAdaPayment ? 'justify-center' : 'justify-start')}>
                                    {allowAdaPayment && (
                                        <div
                                            onClick={() => setSelectedCurrency('ada')}
                                            className={clsx(
                                                'h-18 mt-2.5 flex justify-center rounded-lg bg-lightspace-400 p-2 ring-2 ring-lightspace-100 drop-shadow-black-sharp',
                                                multipleAllowedCurrencies ? 'w-full cursor-pointer' : 'w-full',
                                                selectedCurrency === 'ada'
                                                    ? 'bg-lightspace-400'
                                                    : 'bg-lightspace-600 hover:bg-lightspace-500 active:bg-lightspace-400'
                                            )}
                                        >
                                            <div className={clsx('flex items-center p-2 text-4xl font-bold text-white')}>
                                                {lockedAdaPrice ? `${lockedAdaPrice} ₳` : adaPrice ? `${adaPrice} ₳` : '0 ₳'}
                                            </div>
                                        </div>
                                    )}
                                    {multipleAllowedCurrencies && <div className="grow"></div>}
                                    {allowTokenPayment && (
                                        <div
                                            onClick={() => setSelectedCurrency(tokenFullName)}
                                            className={clsx(
                                                'h-18 flex justify-center rounded-lg border-2 border-lightspace-100 p-2 drop-shadow-black-sharp',
                                                multipleAllowedCurrencies ? 'cursor-pointer' : 'mt-2.5 ',
                                                selectedCurrency === tokenFullName
                                                    ? 'bg-lightspace-400'
                                                    : 'bg-lightspace-600 hover:bg-lightspace-500 active:bg-lightspace-400'
                                            )}
                                        >
                                            <div className={clsx('flex items-center gap-4 font-bold text-white', 'md:gap-2')}>
                                                <div className="text-3xl">{lockedTokenPrice ? lockedTokenPrice : tokenPrice}</div>
                                                <div
                                                    className={clsx(
                                                        'purple-scrollbar-sm w-24 overflow-x-auto whitespace-nowrap text-center text-2xl text-yellow-400',
                                                        'md:w-40'
                                                    )}
                                                >
                                                    {tokenName}
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-lightspace-200 ring-2 ring-lightspace-100">
                                                        <Image
                                                            className={'rounded-lg'}
                                                            src={correctedTokenImage}
                                                            alt={'Token Image'}
                                                            objectFit="contain"
                                                            width={512}
                                                            height={512}
                                                            priority={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    'flex w-full items-center gap-2.5 ',
                                    !multipleAllowedCurrencies ? 'lg:w-40 lg:flex-col lg:items-start' : ''
                                )}
                            >
                                <div className="text-xl font-bold">Quantity:</div>
                                <div className={clsx('flex w-full grow px-2', !multipleAllowedCurrencies ? 'lg:hidden' : '')} />
                                {multipleAllowedCurrencies && <div className="mt-8 text-sm font-bold"></div>}
                                <div className="flex justify-start gap-4">
                                    <div className="flex text-white">
                                        <input
                                            id={'quantity'}
                                            name={`quantity`}
                                            type="number"
                                            step="1"
                                            min="1"
                                            max={maxPerTx}
                                            className={clsx(
                                                'h-18 flex w-24 items-center rounded-lg border-0 bg-lightspace-400 text-4xl font-bold text-white ring-2 ring-lightspace-100 drop-shadow-black-sharp',
                                                'bg-lightspace-600 hover:bg-lightspace-500',
                                                'focus:ring-4 focus:ring-lightspace-100',
                                                'placeholder:text-violet-300'
                                            )}
                                            placeholder="1"
                                            onChange={setQuantity}
                                            value={quantity ? quantity : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={mintProjectNFT}
                                className={clsx(
                                    'flex h-14 w-64 items-center justify-center rounded-lg  text-xl font-bold text-white',
                                    isMintActiveForUser ? 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300' : 'bg-gray-500'
                                )}
                                disabled={!isMintActiveForUser}
                            >
                                <div className="drop-shadow-black-sharp">{isMinting ? <Spinner /> : `Mint NFT${quantity > 1 ? 's' : ''}!`}</div>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={clsx(
                        'mt-24 flex w-72 justify-start gap-2 border-b-2 border-lightspace-200 pb-4',
                        'md:w-full',
                        'lg:w-full',
                        'xl:w-full'
                    )}
                >
                    <button
                        onClick={() => setViewCollectionData(!viewCollectionData)}
                        className={clsx(
                            'flex h-36 w-36 items-center justify-center rounded-lg px-4 text-lg font-bold text-white',
                            viewCollectionData
                                ? 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300'
                                : 'bg-blue-700 hover:bg-blue-600 active:bg-blue-500',
                            'sm:h-14 sm:w-64 sm:text-xl'
                        )}
                    >
                        <div className="drop-shadow-black-sharp">{viewCollectionData ? 'Hide Collection Data' : 'Show Collection Data'}</div>
                    </button>
                    <div className="grow"></div>
                    <div className="grow"></div>
                </div>

                {viewCollectionData && (
                    <div
                        className={clsx(
                            'mt-6 flex w-80 justify-between px-4 transition-all duration-300 ease-in-out',
                            'md:w-auto',
                            'xl:w-auto'
                        )}
                    >
                        <div className="flex w-full flex-col justify-between rounded-xl border border-lightspace-200 bg-lightspace-500 p-6 text-white">
                            <div className={clsx('flex w-full flex-col justify-between gap-8 lg:flex-row')}>
                                <div className={clsx('flex w-full flex-col items-center justify-between gap-8 md:flex-row')}>
                                    <div className="flex-col">
                                        <div className="mb-2.5  text-xl font-bold">Reserved:</div>
                                        <div className="flex  justify-start">
                                            <div
                                                className={clsx(
                                                    'h-18 flex w-full items-center justify-center rounded-lg border-0 bg-lightspace-400 px-4 text-3xl font-bold text-white ring-2 ring-lightspace-100 drop-shadow-black-sharp',
                                                    'bg-lightspace-600 hover:bg-lightspace-500',
                                                    'focus:ring-4 focus:ring-lightspace-100',
                                                    'placeholder:text-violet-300'
                                                )}
                                            >
                                                {nftProjectBuyData?.reserved_nfts +
                                                    nftProjectBuyData?.completed_nfts +
                                                    ' / ' +
                                                    nftProjectBuyData?.total_nfts}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-col">
                                        <div className="mb-2.5 text-xl font-bold">Minted:</div>
                                        <div className="flex  justify-start">
                                            <div
                                                className={clsx(
                                                    'h-18 flex w-full items-center justify-center rounded-lg border-0 bg-lightspace-400 px-4 text-3xl font-bold text-white ring-2 ring-lightspace-100 drop-shadow-black-sharp',
                                                    'bg-lightspace-600 hover:bg-lightspace-500',
                                                    'focus:ring-4 focus:ring-lightspace-100',
                                                    'placeholder:text-violet-300'
                                                )}
                                            >
                                                {nftProjectBuyData?.completed_nfts + ' / ' + nftProjectBuyData?.total_nfts}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

//---------------------------------------------------------------------------//
// Data Functions
//---------------------------------------------------------------------------//
const calculateIsMintActiveForUser = (isMintActiveForAddress: any, totalMintsAllowed: any, quantity: any) => {
    let newMints = quantity;
    if (!newMints) {
        newMints = 1;
    }
    return isMintActiveForAddress && totalMintsAllowed >= newMints;
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Input Functions
//---------------------------------------------------------------------------//
const setQuantityData = (event: any, nftProject: any, totalNewMintsAllowed: number, rerender: any, setRerender: any) => {
    event.preventDefault();
    if (!nftProject) return;

    const paymentData: any = getPaymentData();
    const quantityInput = document.querySelector('#quantity') as HTMLInputElement;
    if (!quantityInput) return;

    let maxQuantityAllowed = nftProject.maxPerTx;
    if (totalNewMintsAllowed < maxQuantityAllowed) {
        maxQuantityAllowed = totalNewMintsAllowed;
    }

    let quantity = parseInt(quantityInput.value);
    if (quantity > totalNewMintsAllowed) quantity = totalNewMintsAllowed;
    if (!quantity || quantity <= 0) quantity = 0;

    let paymentDataObject = structuredClone(paymentData);
    if (!paymentDataObject) paymentDataObject = {};
    paymentDataObject.quantity = quantity;

    setPaymentData(paymentDataObject);
    setRerender(!rerender);
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Mint Functions
//---------------------------------------------------------------------------//
const mintNFT = async (nftProject: any, address: string, count: number, token: string | null) => {
    const nftProjectId = nftProject.id;
    const baseErrorMessage =
        'An unexpected error occured. Ensure your wallet UTXOs are not exhausted, please reach out for help in the Saturn Discord Server';

    try {
        const mintNFTs: CreateBuyRandomMintTransactionInput = {
            nftProjectId: nftProjectId,
            paymentAddress: address,
            count: count,
            paymentToken: token,
            mintingPassword: '',
        };
        const createMintTransaction = await mutateCreateBuyRandomMintTransaction(mintNFTs);
        const hexTransaction = createMintTransaction?.hexTransaction;
        if (!hexTransaction) {
            const error = createMintTransaction?.error?.message;
            console.error(error);
            return;
        }

        // Reconstruct and sign tx
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

        const input: SubmitBuyRandomMintTransactionInput = {
            nftProjectId: nftProjectId,
            paymentAddress: address,
            hexTransaction: signedHex,
        };

        const submitMintTransaction = await mutateSubmitBuyRandomMintTransaction(input);
        const transactionId = submitMintTransaction?.transactionId;
        if (!transactionId) {
            const error = submitMintTransaction?.error?.message;
            console.error(error);
            return;
        }
    } catch (error: any) {
        console.error(error);
    }
};
