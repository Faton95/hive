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

export type TPermissionItem = {
  id: number;
  name: string;
  codename: string
}

export type TUserInfo = {
  user: {
    username: string;
    id: number;
  }
  isSuperuser: boolean;
  position: TPositionItem
}
