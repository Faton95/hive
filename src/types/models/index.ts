export * from './group'
export * from './position'

export type TIdName = {
  id: number;
  name: string;
}

export type TCurrencyItem = {
  id: number;
  name: string;
  sign: string;
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
  product: TProduct;

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
  client: {id: number; fullName: string; phoneNumber: string};
}

export type TClientItem = {
  id: number;
  contacts: Array<TOrderProduct>;
  createdDate: string;
  modifiedDate: string;
  name: string | null;
  email: string | null;
  address: string | null;
  tags: Array<TTagsList>
}

export type TContactItem = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  position: string | null;
}
export type TClientList = Array<TClientItem>
export type TOrderList = Array<TOrderItem>
export type TBranchList = Array<TIdName>
export type TCurrencyList = Array<TCurrencyItem>
export type TTagsList = Array<TIdName>
