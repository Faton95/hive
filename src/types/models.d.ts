
export type TIdName = {
    id: number;
    name: string;
}
export type TProductType = {
    id: number;
    name: string;
}
export type TProduct = {
    id: number;
    name: string;
    code: string | null;
    price: number;
    description: string;
    type: TIdName;
    is_favourite: true;
    brand: TIdName;
    country: TIdName;
}
export type TOrderProduct = {
    id: number;
    price: number;
    amount: number;
    product: TProduct

}
export type TOrderItem = {
    id: number;
    orderProducts: Array<TOrderProduct>;
    createdDate: string;
    address: object;
    totalPrice: string;
    status: string;
    dealType: string;
    paymentType: string;
    balance: string;
    client: {id: number; fullName: string; phone: string};
}

export type TOrderList = Array<TOrderItem>
