import { curry, path } from 'ramda'
import { TGetDataFromState } from '../types'

export const getDataFromState = curry((name, state): TGetDataFromState<any> => ({
  loading: path([name, 'loading'], state),
  failed: path([name, 'failed'], state),
  data: path([name, 'data'], state),
}))
