import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Spinner } from '../../src/components/Elements/Spinner';
import { BuyRandomMintData } from '../../src/components/PageComponents/Payment/BuyRandomMintData';
import { SuccessData } from '../../src/components/PageComponents/Payment/SuccessData';
import { useGetPaymentState } from '../../src/hooks/Component/mint.hook';
import { useGetNFTProjectPayment } from '../../src/hooks/Component/nftProject.hook';
import { PaymentState } from '../../src/types/Enums/PageStates/MintState';

export const MintCollectionPage = () => {
    const router = useRouter();
    const { nft_project_id }: any = router.query;

    // Wallet connect and get address query here
    const address = '';

    const { data: paymentState }: any = useGetPaymentState();
    const { data: nftProjectBuyData, isLoading: isProjectDataLoading }: any = useGetNFTProjectPayment(nft_project_id, address);
    return (
        <>
            <div className={clsx('flex flex-col items-center justify-center', 'sm:w-full')}>
                {isProjectDataLoading || !nftProjectBuyData ? (
                    <div className="h-120 flex w-full items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {paymentState === PaymentState.Purchase && <BuyRandomMintData nftProjectBuyData={nftProjectBuyData} />}
                        {paymentState === PaymentState.Success && <SuccessData nftProjectBuyData={nftProjectBuyData} />}
                    </>
                )}
            </div>
        </>
    );
};

export default MintCollectionPage;
