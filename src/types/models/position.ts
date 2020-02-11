import { TGroupItem } from 'types'
import { Merge, TIdName } from '../index'

export type TPositionItem = Merge<TIdName, {
  groups: TGroupItem[];
}>

export type TStaffItem = {
  id: number;
  username: string;
  fullName: string;
  position: TPositionItem;
  rate: string;
}
