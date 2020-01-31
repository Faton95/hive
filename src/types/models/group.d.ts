import { Merge, TIdName } from 'types'


export type TGroupItem = Merge<TIdName, {permissions: TIdName[]}>

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

type TImage = {
  id: number;
  name: string;
  file: string;
  contectType: string;
}
export type TClientItem = {
  id: number;
  fullName: string | null;
  photo: TImage | null;
  languageNews: string;
  phoneNumber: string;
  isMailing: boolean;
}

export type TAddressList = {
  id: number;
  phone: string;
  contactPerson: string | null;
  address: string | null;
  location: string | null;
  createdDate: string;
  referencePoint: string | null;
}
export type TCommentItem = {
  id: number;
  createdDate: string;
  tm: null;
  comment: string | null;
  product: number;
  client: TClientItem;
  repliedTo: null;
  replies: [];
}

export type TSubscriptionItem = {
  id: number;
  createdDate: string;
  modifiedDate: string;
  tm: null;
  message: string;
}
export type TBankAddressItem = {
  id: number;
  createdDate: string;
  modifiedDate: string | null;
  name: string | null;
  code: string | null;
  address: string | null;
  bankDetails: string | null;
  branch: number;
  currency: Array<number>
}
export type TSubscriptionList = TSubscriptionItem[]

export type TOrderList = Array<TOrderItem>
export type TClientList = Array<TClientItem>
export type TCommentList = Array<TCommentItem>
export type TBankAddressList = Array<TBankAddressItem>
