export interface NFTPriceData {
    adaPrice: string;
    allowAdaPayment: boolean;
    isMainPrice: boolean;
    tokenPrices?: NFTTokenPriceData[];
}

export interface NFTTokenPriceData {
    tokenFullName: string;
    tokenPrice: number;
    allowTokenPayment: boolean;
}
