import { TAssignmentItem, TExpenseItem, TFeeItem, TIdName, TUserInfo } from 'types'

export type PreInvoiceAssignmentItem = {
  id: number;
  fees: TFeeItem[];
  expenses: TExpenseItem[];
  createdDate: string;
  modifiedDate: string;
  assignment: TAssignmentItem;
}
export type TPreInvoiceItem = {
  id: number;
  assignments: PreInvoiceAssignmentItem[];
  createdDate: string;
  modifiedDate: string;
  fromDate: string;
  toDate: string;
  date: string;
  type: 'all' | 'custom' | 'expense';
  user: TUserInfo;
  client: TIdName;
}

export type TInvoiceAssignmentItem = {
  id: number;
  dueDate: string;
  totalAmount: string;
  description: string
  assignment: TAssignmentItem;
  fees: TFeeItem[]
  expenses: TExpenseItem[]
}
export type TInvoiceItem = {
  id: number;
  assignments: TInvoiceAssignmentItem[];
  createdDate: string;
  modifiedDate: string;
  isDelete: boolean;
  total_amount: string;
  dueDate: string;
  issueDate: string | null
  statusPayment: string;
  balance: string| null;
  description: string;
  user: TUserInfo;
  client: TIdName
}
