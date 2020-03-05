import {TAssignmentItem} from "types";

export type TFeeItem = {
  id: number;
  assigment: TAssignmentItem;
  createdDate: string;
  isDelete: boolean;
  spentTime: string;
  amount: string;
  date: string;
  description: string;
  user: number;
}

export type TTimeSheetItem = {
  id: number
  assigment: TAssignmentItem
  createdDate: string
  modifiedDate: string
  isDelete: boolean
  startTime: string
  endTime: string | null
  type: "play" | 'pause' | 'stop'
  totalDuration: number
  description: string
  fee: TFeeItem
  user: number
}
