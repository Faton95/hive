import { TIdName, TCurrencyItem, TPositionItem, TStaffItem } from 'types'

/*
*
* id: 2
created_date: "2020-01-31T10:47:37.102161"
modified_date: "2020-01-31T10:47:37.102188"
billing_type: "hourly_billing"
fixed_fee_amount: null
fixed_fee_expenses_included_in_fee: false
hourly_has_fee_ceiling: true
hourly_fee_ceiling: "30.00"
success_fee: "300.00"
dead_line: "2020-02-04"
payment_duration: 10
payment_date: null
client: {id: 3, name: "Fatkhullo"}
branch: {id: 1, name: "branch test12"}
currency: {id: 1, name: "Fatkhullo33", sign: "111222333444444"}
bank_account: 1
*
* */
export type TRateItem = {
  position: TPositionItem;
  amountPerHour: number;
}
export type TAssignmentItem = {
  id: number;
  name: string;
  createdDate: string;
  modifiedDate: string;
  invoiceExpenseAmount: string | null;
  uninvoiceExpenseAmount: number | null;
  invoiceFeeAmount: string | null;
  uninvoiceFeeAmount: string | null;
  invoiceFeeHours: string | null;
  uninvoiceFeeHours: string | null;
  billingType: 'hourly_billing' | 'fixed_fee' | undefined;
  fixedFeeAmount: string | null;
  fixedFeeExpensesIncludedInFee: boolean;
  hourlyHasFeeCeiling: boolean;
  hourlyFeeCeiling: string | null;
  successFee: number | string;
  deadLine: string;
  paymentDuration: number;
  paymentDate: string | null;
  client: TIdName;
  branch: TIdName;
  currency: TCurrencyItem;
  bankAccount: number;
  status: string;
  rates: TRateItem[];
}

export type TExpenseItem = {
  id: number;
  outsource: object | null;
  date: string;
  description: string;
  assigment: TAssignmentItem;
  created_date: string;
  is_delete: false;
  cashier: object | null;
  user: TStaffItem;
  amount: string;
}
