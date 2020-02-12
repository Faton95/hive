import { TGroupItem } from 'types'
import { Merge, TIdName } from '../index'

export type TPositionItem = Merge<TIdName, {
  groups: TGroupItem[];
}>

export type TPermissionItem = {
  id: number;
  name: string;
  codename: string
}
