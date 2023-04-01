import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../state';
import { PaymentState } from '../../types/Enums/PageStates/MintState';

const BASE_MINT_KEY = 'mint';
const BASE_PAYMENT_MINT_KEY = 'payment';

export const PAYMENT_DATA_KEY = [BASE_MINT_KEY, BASE_PAYMENT_MINT_KEY];
export const PAYMENT_STATE_KEY = [BASE_MINT_KEY, BASE_PAYMENT_MINT_KEY, 'state'];

//---------------------------------------------------------------------------------------------------//
// Payment Functions
//---------------------------------------------------------------------------------------------------//

// State Functions
export const getPaymentState = () => {
    const paymentState = queryClient.getQueryData(PAYMENT_STATE_KEY);
    return paymentState ? paymentState : PaymentState.Purchase;
};

export const setPaymentState = (state: PaymentState) => queryClient.setQueryData(PAYMENT_STATE_KEY, state);
export const useGetPaymentState = () => useQuery(PAYMENT_STATE_KEY, () => getPaymentState());
export const useSetPaymentState = (state: PaymentState) => useQuery(PAYMENT_STATE_KEY, () => setPaymentState(state));

// Data Functions
export const getPaymentData = () => queryClient.getQueryData(PAYMENT_DATA_KEY);
export const setPaymentData = (paymentData: any) => queryClient.setQueryData(PAYMENT_DATA_KEY, paymentData);

export const useGetPaymentData = () => useQuery(PAYMENT_DATA_KEY, () => getPaymentData());
export const useSetPaymentData = (paymentData: any) => useQuery(PAYMENT_DATA_KEY, () => setPaymentData(paymentData));
//---------------------------------------------------------------------------------------------------//
