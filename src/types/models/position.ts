import { TGroupItem } from 'types'
import { Merge, TIdName } from '../index'

export type TPositionItem = Merge<TIdName, {
  groups: TGroupItem[];
}>

export type TStaffItem = {
  id: number;
  photo: string;
  username: string;
  fullName: string;
  position: TPositionItem;
  rate: string;
}
