import clsx from 'clsx';
import Image from 'next/image';
import { setPaymentState, useGetPaymentData } from '../../../hooks/Component/mint.hook';
import { useGetNFTProjectPurchases } from '../../../hooks/Component/nftProject.hook';
import { PaymentState } from '../../../types/Enums/PageStates/MintState';
import { getRandomLeftBlob, getRandomRightBlob } from '../../../utils/blobs';
import { convertIPFSToHTTP } from '../../../utils/image';
import { getTransactionLink } from '../../../utils/transaction';

export const SuccessData = ({ nftProjectBuyData }: any) => {
    const { data: paymentData }: any = useGetPaymentData();
    const { data: purchases, isLoading }: any = useGetNFTProjectPurchases(
        { nftProjectId: nftProjectBuyData?.id, address: paymentData?.address, txHash: paymentData?.txHash },
        { enabled: !!paymentData?.address && !!paymentData?.txHash }
    );

    const purchaseMoreNFTs = () => setPaymentState(PaymentState.Purchase);
    const purchasedNFTs = purchases?.purchasedNFTs;

    const link = getTransactionLink(paymentData?.txHash);
    const leftBlobImage = getRandomLeftBlob();
    const rightBlobImage = getRandomRightBlob();
    if (!purchases || isLoading) return <></>;
    return (
        <div className="mt-4 flex w-full flex-col items-center justify-start px-4">
            <div className="flex w-full flex-col">
                <div className="flex w-full justify-center">
                    <div className="mb-2 flex h-48 w-48 items-center justify-center p-2">
                        <div className="animate-blob-bounce flex h-48 w-48 items-center justify-center">
                            <Image src={leftBlobImage} width={400} height={400} alt={'Left Blob Image'} priority={true} />
                        </div>
                    </div>
                    <div className="mb-2 flex h-48 w-48 items-center justify-center p-2">
                        <div className="animate-blob-bounce flex h-48 w-48 items-center justify-center">
                            <Image src={rightBlobImage} width={400} height={400} alt={'Right Blob Image'} priority={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-4 flex w-full flex-col">
                <div className="flex w-full flex-col items-center justify-center gap-2">
                    <div className="text-center text-3xl font-bold text-white">Congratulations!</div>
                    <div className="text-sm font-bold text-violet-200 opacity-60">
                        Your NFT{purchasedNFTs?.length > 1 ? 's' : ''} will appear in your wallet momentarily
                    </div>
                    <div className="flex justify-center gap-4">
                        {link && (
                            <div className="mt-6 text-base font-bold text-white">
                                <a href={link} className="link" target="_blank" rel="noopener noreferrer">
                                    <div
                                        className={clsx(
                                            'flex cursor-pointer items-center justify-center rounded-lg border border-lightspace-300 bg-space-500 drop-shadow-black-sharp',
                                            'hover:bg-space-400',
                                            'active:bg-space-300',
                                            'h-12 w-40',
                                            'md:h-14 md:w-60'
                                        )}
                                    >
                                        View Transaction
                                    </div>
                                </a>
                            </div>
                        )}
                        <div className="mt-6 text-base font-bold text-white">
                            <div
                                onClick={purchaseMoreNFTs}
                                className={clsx(
                                    'flex cursor-pointer items-center justify-center rounded-lg border border-lightspace-300 bg-space-500 px-8 py-3 text-center drop-shadow-black-sharp',
                                    'hover:bg-space-400',
                                    'active:bg-space-300',
                                    'h-12 w-40',
                                    'md:h-14 md:w-60'
                                )}
                            >
                                Purchase More NFTs!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center md:w-1/2">
                <div className="border-b-3 flex w-full justify-center border-lightspace-200 pb-2 text-lg font-bold text-white">
                    <div>NFT{purchasedNFTs?.length > 1 ? 's' : ''}</div>
                    <div className="ml-3 text-xs leading-8 text-violet-200 opacity-60">
                        {purchasedNFTs?.length} item{purchasedNFTs?.length > 1 ? 's' : ''}
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className={'mt-6 grid grid-cols-1 gap-6'}>
                        {purchasedNFTs?.map((nft: any, i: any) => {
                            const name = nft.name;
                            const image = nft.image ? convertIPFSToHTTP(nft.image) : '/images/nft-images/PlaceholderNFTLightspace.png';
                            return (
                                <div key={i}>
                                    <div
                                        className={clsx(
                                            'flex h-80 w-80 items-center justify-center rounded-lg border-2 border-lightspace-200 bg-lightspace-400 drop-shadow-black-sharp',
                                            'sm:h-100 sm:w-100'
                                        )}
                                    >
                                        <Image className="rounded-lg" src={image} width={512} height={512} alt={'NFT'} priority={true} />
                                    </div>
                                    <div className="my-2 flex justify-center text-lg font-bold text-white">{name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
