import {TAssignmentItem, TExpenseItem, TFeeItem, TIdName, TUserInfo} from "types";


export type PreInvoiceAssignmentItem = {
  id: number;
  fees: TFeeItem[];
  expenses: TExpenseItem[];
  created_date: string;
  modified_date: string;
  assignment: TAssignmentItem;
}
export type TPreInvoiceItem = {
  id: number;
  assignments: PreInvoiceAssignmentItem[];
  created_date: string;
  modified_date: string;
  fromDate: string;
  toDate: string;
  date: string;
  type: 'all' | 'custom' | 'expense';
  user: TUserInfo;
  client: TIdName;
}
