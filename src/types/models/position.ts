import { TGroupItem } from 'types'
import { Merge, TIdName } from '../index'

export type TPositionItem = Merge<TIdName, {
  groups: TGroupItem[];
}>
